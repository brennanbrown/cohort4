from app import app, db
from flask import render_template, request, Response, json, redirect, flash, url_for, session
from app.models import User, Course, Enrollment
from app.forms import LoginForm, RegisterForm


#     ----- INDEX -----     #

@app.route("/")
@app.route("/index")
@app.route("/home")
def Index():
    index_page = render_template("index.html", index = True)
    return index_page


#     ----- LOGIN -----     #

@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get("username"):
        flash(f"You are already logged in.", "success")
        return redirect(url_for("Index"))
    form = LoginForm()
    if form.validate_on_submit():
        email    = form.email.data
        password = form.password.data
        # Compares the form email to the database.
        # .first() will only return a single object,
        # not the entire array.
        user = User.objects(email = email).first()
        # Retrieves the hashed password:
        if (user and user.get_password(password)):
            flash(f"{user.first_name}, you are successfully logged in!", "success")
            session["user_id"] = user.user_id
            session["username"] = user.first_name
            return redirect("/index")
        else:
            flash("Sorry, something went wrong.","danger")
    login_page = render_template(
        "login.html", 
        title="Login", 
        form = form, 
        login = True)
    return login_page


#     ----- LOGOUT -----     #

@app.route("/logout")
def logout():
    session["user_id"] = False
    session.pop("username", None)
    flash(f"You have been logged out.", "info")
    return redirect(url_for("Index"))


#     ----- COURSES -----     #

@app.route("/courses/")
@app.route("/courses/<term>")
def courses(term = None,):
    if term is None:
        term = "Autumn 2020"
    # Sorts courses by their ID.
    classes = Course.objects.order_by("+courseID")
    courses_page = render_template(
        "courses.html", 
        course_data = classes, 
        courses = True, 
        term = term)
    return courses_page

#     ----- REGISTRATION -----     #

@app.route("/register", methods=["POST", "GET"])
def register():
    if session.get("username"):
        flash(f"You are already registered.", "success")
        return redirect(url_for("Index"))
    form = RegisterForm()
    if form.validate_on_submit():
        # Determines the ID by counting
        # amount of current entries,
        # and then just adds one.
        user_id  = User.objects.count()
        user_id += 1

        email      = form.email.data
        password   = form.password.data
        first_name = form.first_name.data
        last_name  = form.last_name.data

        # Adds the properties to the new entry.
        user = User(
            user_id = user_id,
            email = email, 
            first_name = first_name, 
            last_name = last_name)
        user.set_password(password)

        # Saves new entry to database.
        user.save()
        flash("You are successfully registered!","success")
        return redirect(url_for("Index"))
    register_page = render_template(
        "register.html", 
        title = "Register", 
        form = form, 
        register = True)
    return register_page


#     ----- ENROLLMENT -----     #

@app.route("/enrollment", methods=["GET", "POST"])
def enrollment():
    if not session.get("username"):
        flash(f"You need to log in to view your schedule.", "warning")
        return redirect(url_for("login"))

    courseID = request.form.get("courseID")
    courseTitle = request.form.get("title")
    user_id = session.get("user_id")

    if courseID:
        if Enrollment.objects(user_id = user_id, courseID = courseID):
            flash(f"Oops! You are already enrolled in the course {courseTitle}!", "warning")
            return redirect(url_for("courses"))
        else:
            Enrollment(user_id = user_id, courseID = courseID).save()
            flash(f"You are now enrolled in {courseTitle}!", "success")

    classes = list( User.objects.aggregate(*[
        {
            '$lookup': {
                'from': 'enrollment', 
                'localField': 'user_id', 
                'foreignField': 'user_id', 
                'as': 'result_1'
            }
        }, {
            '$unwind': {
                'path': '$result_1', 
                'includeArrayIndex': 'string', 
                'preserveNullAndEmptyArrays': False
            }
        }, {
            '$lookup': {
                'from': 'course', 
                'localField': 'result_1.courseID', 
                'foreignField': 'courseID', 
                'as': 'result_2'
            }
        }, {
            '$unwind': {
                'path': '$result_2', 
                'preserveNullAndEmptyArrays': False
            }
        }, {
            '$match': {
                'user_id': user_id
            }
        }, {
            '$sort': {
                'courseID': 1
            }
        }
    ]))

    enrollment_page = render_template(
        "enrollment.html", 
        enrollment = True, 
        classes = classes)
    return enrollment_page


#     ----- API -----     #

@app.route("/api/")
@app.route("/api/<idx>")
# If no index, default to /api/
def api(idx=None):
    if (idx == None):
        j_data = Course.objects
    else:
        j_data = Course.objects[int(idx)]
    
    return Response(
        json.dumps(j_data), 
        mimetype="application/json")


#     ----- USER -----     #

# Display DB via the browser:
@app.route("/user")
def user():
    users = User.objects.all()
    user_page = render_template("user.html", users=users)
    return user_page

def test_function():
    return "Success!"
import React, { Component } from "react"

export const Book = ({title = "No Title Provided", author = "No Author Provided", pages = 0, freeBookmark}) => {
    return (
        <section class="books">
        <h2><a href={title}>{title}</a></h2>
        <p>By: {author}</p>
        <p>Pages: {pages}</p>
        <p>Free Bookmark Today: {freeBookmark ? "yes!" : "no!"}</p>
        </section>
        )
    }
    
    export default Book
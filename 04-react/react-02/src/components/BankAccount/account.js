class AccountController {
    
    constructor() {
        this.accountsHolder = [];
        this.accountCards = [];
        this.counter = 1;
    }
    
    nextKey() {
        return `k${this.counter++}`;
    }
    
    createAccount(name, balance) {
        const key = this.nextKey();
        if (balance >= 0) {
            const newAccount = new Account(key, name, balance);
            this.accountsHolder.push(newAccount);
            newAccount.createAccountCard();
            this.accountCards.push(newAccount);
        } else {
            alert("Amount must be positive!");
        }
    }
    
    getAccount(k) {
        const theKey = k;
        const finding = this.accountsHolder.find(x => x.key === theKey);
        return finding;
    }

    findAccount(name) {
        const changingAccount = this.accountsHolder.find(x => x.accountName === name);
        return (changingAccount);
    }
    
    depositIT(name, depositAmount) {
        const currentAccount1 = this.findAccount(name);
        const acc1 = new Account(currentAccount1.key, currentAccount1.accountName, currentAccount1.balance);
        if (depositAmount >= 0) {
            acc1.accountDeposit(depositAmount);
            currentAccount1.balance = acc1.balance;
            currentAccount1.divCard.innerText = "Account: " + currentAccount1.accountName + "\nBalance: " + currentAccount1.balance + "$";
            return currentAccount1;
        }
        else if (depositAmount < 0) { alert("deposit must be positive!"); }
    }

    withdrawIT(name, withdrawamount) {
        const currentAccount2 = this.findAccount(name);
        const acc2 = new Account(currentAccount2.key, currentAccount2.accountName, currentAccount2.balance);
        if (withdrawamount >= 0) {
            acc2.accountWithdraw(withdrawamount);
            currentAccount2.balance = acc2.balance;
            currentAccount2.divCard.innerText = "Account: " + currentAccount2.accountName + "\nBalance: " + currentAccount2.balance + "$";
            if (acc2.balance < 0) {
                alert("You have negative balance! Please deposit money or bank charges will be applied in 5 business days.");
            }
            return currentAccount2;
        }
        else if (withdrawamount < 0) { alert("Withdraw must be positive"); }
    }
    
    deleteAccount(key1) {
        // const deletedAccount = this.accountsHolder.find(x => x.key === key1);
        const deleteIndex = this.accountsHolder.indexOf(this.accountsHolder.find(x => x.key === key1));
        this.accountsHolder.splice(deleteIndex, 1);        
        this.accountCards.splice(deleteIndex, 1);
    }

    accountSummary() {
        /*  ELEMENT KEY:
        0 = Total Amount from all accounts 
        1 = Total Number of accounts
        2 = Smallest Amount - Account Name
        3 = Smallest Amount - Value
        4 = Largest Amount - Account Name
        5 = Largest Amount - Value
        */
        const allsummaries = [];
        if (this.accountsHolder.length===0 && this.accountCards.length===0){
            alert("Error! You are deleting the last account. Please register for an account. ");
        } else {
            const balancesK = this.accountsHolder.map(temp => ({ "key": temp.key, "balance": temp.balance }));
            const allBalances = balancesK.map(d => d.balance);
            allsummaries[0] = allBalances.reduce((total, num) => total + num, 0);
            allsummaries[1] = this.accountsHolder.length;
            const minBalance = Math.min.apply(Math, allBalances);
            console.log(minBalance);
            const minAccount = this.accountsHolder.find(x => x.balance === minBalance);
            console.log(minAccount);
            allsummaries[2] = minAccount.accountName;
            allsummaries[3] = minBalance;
            const maxBalance = Math.max.apply(Math, allBalances);
            const maxAccount = this.accountsHolder.find(x => x.balance === maxBalance);
            allsummaries[4] = maxAccount.accountName;
            allsummaries[5] = maxBalance;
        }   
        return allsummaries;
    }
}


class Account {
    
    constructor(key, _accountName, StartingBalance) {
        this.key = key;
        this.accountName = String(_accountName);
        this.balance = Number(StartingBalance);
    }
    
    createAccountCard() {
        const divCardkey = this.key;
        const divCard = document.createElement("div");
        this.divCard = divCard;
        divCard.setAttribute("class", "card");
        divCard.setAttribute("key", divCardkey);
        divCard.innerText = "Account: " + this.accountName + "\nBalance: " + this.balance + "$";
        return divCard;
    }
    
    accountDeposit(amount) {
        return (this.balance += parseFloat(amount));
    }
    
    accountWithdraw(amount) {
        return (this.balance -= parseFloat(amount));
    }
}
export default { Account, AccountController };
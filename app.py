def load_users():
    users = {}
    try:
        with open("users.txt", "r") as file:
            for line in file:
                username,password = line.strip().split(",")
                users[username] = password
    except FileNotFoundError:
        pass
    return users
def save_users(users):
    with open("users.txt", "w") as file:
        for username,password in users.items():
            file.write(f"{username},{password}\n")
def register(users):
    while True:
        username = input("Username: ")
        password = input("Password: ")
        confirm_password = input("Confirm Password: ")
        if username in users:
            print("Username already exist")
        elif password != confirm_password:
            print("Password do not match")
        else:
            users[username] = password
            print("User created!")
            break
def login(users):
    attempts = 3
    while True:
        username = input("Username: ")
        password = input("Password: ")
        if username not in users:
            print("Username does not exist")
            attempts -= 1
            print(f"Attempts left: {attempts}")
        elif password != users[username]:
            print("Password do not match")
            attempts -= 1
            print(f"Attempts left: {attempts}")
        else:
            print("Login successful")
            return
        if attempts == 0:
             print("User locked")
def forgot_password(users):
    while True:
        username = input("Username: ")
        new_password = input("Password: ")
        confirm_password = input("Confirm Password: ")
        if username not in users:
            print("Username does not exist")
        elif new_password != confirm_password:
            print("Password do not match")
        else:
            print("Password change successful")
            users[username] = new_password
            break
    return users
def del_user(users):
    while True:
        username = input("Username: ")
        password = input("Password: ")
        if username not in users:
            print("Username does not exist")
        elif password != users[username]:
            print("Password do not match")
        else:
            print("User deleted")
            del users[username]
            break
def main():
    users = load_users()
    while True:
        print("_______Welcome_______")
        print("\n 1: Register")
        print(" 2: login")
        print(" 3: Forgot Password")
        print(" 4: del")
        print(" 5: exit")
        choice = input("Enter your choice: ")
        if choice == "1":
            register(users)
            save_users(users)
        elif choice == "2":
            login(users)
        elif choice == "3":
            forgot_password(users)
            save_users(users)
        elif choice == "4":
            del_user(users)
            save_users(users)
        elif choice == "5":
            print("Exiting program.....")
            break
        else:
            print("Invalid choice")
if __name__ == "__main__":
    main()









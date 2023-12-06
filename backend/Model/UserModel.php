<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";



class UserModel extends Database

{

    //lists users 
    public function getUsers($limit)
    {

        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }

    //creates a new entry in our users table
    public function createUser($postData)
    { 
        
        $username= $postData[0];
        $password = $postData[1];
        $verifyPassword = $postData[2];

        if ($password === $verifyPassword && strlen($password) >= 10) {
            // Use password_hash to securely hash the user's password.
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Check if the user already exists.
            
            $checkUserQuery = "SELECT username FROM users WHERE username = ?";
            $stmt = $this->connection->prepare($checkUserQuery);
            $stmt->bind_param('s', $username);
            $result = $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0){
                $response['error'] = "User with this username already exists. Please login or choose a different username.";
            } else {
                // Insert the new user into the users table.
                $insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
                $stmt = $this->connection->prepare($insertUserQuery);
                $stmt->bind_param('ss', $username, $hashedPassword);
                $result = $stmt->execute();

                if ($result) {
                    $response['success'] = true;         
                } else {
                    $response['error'] = "User registration failed!";   
                }
            }
        } else {
            $response['error'] = "Password and confirm password do not match or are less than 10 characters long.";
        }

        return $response;

    }

    //Verifies a user
    public function verifyUser($postData)
    {   
        $response = [
            'success' => false,
            'message' => '',
        ];

        $userid= $postData[0];
        $password = $postData[1];

        $getUserQuery = "SELECT password FROM users WHERE username = ?";
        $stmt = $this->connection->prepare($getUserQuery);
        $stmt->bind_param("s", $userid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User with the entered username exists, now verify the password.
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];

            if (password_verify($password, $hashedPassword)) {
                // Passwords match, so it's a successful login.
                $response['success'] = true; 
                $response['message '] = "user verified";
                return json_encode($response);
            } else {
                $response['success'] = false; 
                $response['message '] = "wrong user id or password";
                return json_encode($response);

            }
        } else {
            // No user with the entered username found.
            $response['success'] = false; 
            $response['message '] = "user does not exist";
            return json_encode($response);
        }
    }

}
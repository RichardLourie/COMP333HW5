<?php

class UserController extends BaseController
{

    /*
    Handles request to list all users
    */
    public function listAction()
    {
        $strErrorDesc = '';

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        $arrQueryStringParams = $this->getQueryStringParams();


        if (strtoupper($requestMethod) == 'GET') {

            try {

                $userModel = new UserModel();
                $intLimit = 10;

                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {

                    $intLimit = $arrQueryStringParams['limit'];

                }

                $arrUsers = $userModel->getUsers($intLimit);

                $responseData = json_encode($arrUsers);
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }

        // send output 

        if (!$strErrorDesc) {

            $this->sendOutput(

                $responseData,

                array('Content-Type: application/json', 'HTTP/1.1 200 OK')

            );

        } else {

            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 

                array('Content-Type: application/json', $strErrorHeader)

            );

        }

    }


    /*Handles request to create user*/
    public function createAction()
    {

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if(strtoupper($requestMethod) == 'POST'){
            // retrieve user registration data from the request body

            //$postData = json_decode(file_get_contents('php://input'),true);
            $postData = array($_GET['username'],$_GET['password'], $_GET['confirmpassword']);

            //$postData = array("testcreateion","testcreation");
            //instantiate usermodel
            $userModel = new UserModel();
            $result = $userModel->createUser($postData);

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 201 OK')
                
            );
        }

    }

    /*Handles request to verify a user*/
    public function verifyAction()
    {
        
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if(strtoupper($requestMethod) == 'POST'){
            //$postData = json_decode(file_get_contents('php://input'),true);
            $postData = array($_GET['username'],$_GET['password']);

            $userModel = new UserModel();
            $result = $userModel->verifyUser($postData);

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 201 OK')

            );
        }
    }
    
}
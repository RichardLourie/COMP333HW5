 <?php

class SongController extends BaseController
{

/*
Handles request to list all songs. 
*/
    public function listAction()
    {
        $strErrorDesc = '';

        $requestMethod = $_SERVER["REQUEST_METHOD"];

        $arrQueryStringParams = $this->getQueryStringParams();


        if (strtoupper($requestMethod) == 'GET') {

            try {

                $songModel = new songModel();
                $intLimit = 10;

                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {

                    $intLimit = $arrQueryStringParams['limit'];
                }

                $arrRatings = $songModel->getSongs($intLimit);

                $responseData = json_encode($arrRatings);
            } catch (Error $e) {

                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

            }

        } else {

            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

        }

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

    /*
    Function takes an API call to add a song. 
    */
    public function createAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if(strtoupper($requestMethod) == 'POST'){
            // retrieve user registration data from the request body

            //$postData = json_decode(file_get_contents('php://input'),true);
            $postData = array($_GET['username'],$_GET['artist'], $_GET['song'], $_GET['rating']);

            //instantiate usermodel
            $songModel = new SongModel();
            $result = $songModel->createRatings($postData);

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 201 OK')

            );
        }
    }

    /* Takes an API call to update a specific entry. 
    */
    public function updateAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if(strtoupper($requestMethod) == 'POST'){
            // retrieve user registration data from the request body

            //$postData = json_decode(file_get_contents('php://input'),true);
            $postData = array($_GET['ratingid'],$_GET['artist'], $_GET['song'], $_GET['rating']);

            //instantiate usermodel
            $songModel = new SongModel();
            $result = $songModel->updateRatings($postData);

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 200 OK')

            );
        }
    }

    /*Function handles an API call to delete a rating entry*/
    public function deleteAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if(strtoupper($requestMethod) == 'POST'){
            // retrieve user registration data from the request body

            //$postData = json_decode(file_get_contents('php://input'),true);
            $postData = $_GET['ratingid'];

            //instantiate usermodel
            $songModel = new SongModel();
            $result = $songModel->deleteRatings($postData);

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 200 OK')

            );
        }
    }

    /* Handles API call to return stats about the ratings on our site. 
    */
    public function statsAction()
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if(strtoupper($requestMethod) == 'GET'){

            //instantiate usermodel
            $songModel = new SongModel();
            $result = $songModel->getStats();

            $this->sendOutput(json_encode($result),

                array('Content-Type: application/json', 'HTTP/1.1 200 OK')

            );
        }
    }
}
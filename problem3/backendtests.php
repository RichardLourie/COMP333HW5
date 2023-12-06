```php
<?php

class backendtests extends PHPUnit\Framework\TestCase
{
   protected $client;

   protected function setUp() : void{
      parent::setUp();
      $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost"]);
   }

   public function testGet_UserList() {
      $response = $this->client->request('GET', 'index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   public function testPost_CreateUser() {
      $response = $this->client->request('POST', 'index.php/user/create?username=testusr&password=testpsswrd&confirmpassword=testpsswrd');
      $this->assertEquals(201, $response->getStatusCode());
   }
   public function testPost_LoginUser() {
      $response = $this->client->request('POST', 'index.php/user/verify?username=testusr&password=testpsswrd');
      $this->assertEquals(201, $response->getStatusCode());
   }
   public function testPost_FailedLogin() {
      $response = $this->client->request('POST', 'index.php/user/verify?username=testusr&password=testfailure');
      $this->assertEquals(201, $response->getStatusCode());
   }
   public function testPost_NewSong() {
      $response = $this->client->request('POST', 'index.php/song/create?username=testusr&artist=artst&song=sng&rating=1');
      $this->assertEquals(201, $response->getStatusCode());
   }
   public function testPost_updateSong() {
      $response = $this->client->request('POST', 'index.php/song/update?ratingid=2&artist=artist&song=sng&rating=2');
      $this->assertEquals(200, $response->getStatusCode());
   }
   public function testPost_DeleteSong() {
      $response = $this->client->request('POST', 'index.php/song/delete?ratingid=2');
      $this->assertEquals(200, $response->getStatusCode());
   }

   public function tearDown() : void{
      parent::tearDown();
      $this->client = null;
   }
}
?>

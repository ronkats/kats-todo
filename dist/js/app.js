//setup angular
var app = angular.module('kats-todo', ['ionic', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('kats-todo');
});

app.controller('main', function ($scope, $ionicModal, localStorageService) { //store the entities name in a variable var taskData = 'task';

    //store the entities name in a variable
    var taskData = 'task';

    //initialize the tasks scope with empty array
    $scope.tasks = [];

    //initialize the task scope with empty object
    $scope.task = {};

    //configure the ionic modal before use
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newTaskModal = modal;
    });

    $scope.getTasks = function () {
        //fetches task from local storage
        if (localStorageService.get(taskData)) {
            $scope.tasks = localStorageService.get(taskData);
        } else {
            $scope.tasks = [];
        }
    };

    $scope.createTask = function () {
        //creates a new task
        $scope.tasks.push($scope.task);
        localStorageService.set(taskData, $scope.tasks);
        $scope.task = {};
        //close new task modal
        $scope.newTaskModal.hide();
    };

    $scope.removeTask = function (index) {
        //removes a task
        $scope.tasks.splice(index, 1);
        localStorageService.set(taskData, $scope.tasks);
    };

    $scope.completeTask = function (index) {
        //updates a task as completed
        if (index !== -1) {
            $scope.tasks[index].completed = true;
        }

        localStorageService.set(taskData, $scope.tasks);
    };
    $scope.openTaskModal = function () {
        $scope.newTaskModal.show();
    };

    $scope.closeTaskModal = function () {
        $scope.newTaskModal.hide();
    };
});


var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "apps.ronniekats.nl",
  user: "appadmin",
  password: "140@Rixtwei",
  database: "kats_todo_db"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

//records count
con.query('SELECT * FROM todo_table',function(err,rows){
    if (err) { throw err; }

  console.log('Data received from Db:\n');
  console.log(rows);
});

var store_taak = { ID: 1, Aangemaakt: '3-3-2016 22:34', Afgerond:0, Titel:'De titel', Content:'inhoud van de taak', Gebruiker:'gebruiker1' };
con.query('INSERT INTO todo_table SET ?', store_taak, function(err,res){
    if (err) { throw err; }

  console.log('Last insert ID:', res.insertId);
});

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
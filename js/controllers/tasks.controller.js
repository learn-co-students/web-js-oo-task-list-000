'use strict';

function Task(description, priority, list){
  this.description = description;
  this.priority = priority;
  this.list = list;

  list.tasks.push(this);
  this.id = list.tasks.length - 1;
  this.removeFromTasks = function(){
    list.tasks.splice(this.id, 1, null)
  };

  this.liEl = function(){
    return "<li data-id=\"" + this.id +"\"><button class=\"destroy-task\">x</button> " + this.description + ", " + this.priority + "</li>";
  };
  this.build = function(){
    var header = new RegExp("x " + this.list.title)
    var $list = $("h2").filter(function(){
      return $(this).text().match(header);
    });
    $list.parent().children("ul").append(this.liEl());
    // $("h2:contains(" + this.list.title + ")").parent().children("ul").append(this.liEl());
  };
};

function TasksController(){
  this.$addTaskForm = $('#add_task');
  this.$taskDescriptionInput = $('#task_description');
  this.$selectListMenu = $('#select_list');
  this.$taskPriorityInput = $('#task_priority');
  this.$wrapper = $('#wrapper');

  this.init = function(){
    $("#add_task").submit(function(event){
      event.preventDefault();
      var description = $("#task_description").val();
      var priority = $("#task_priority").val();
      var list = List.all.filter(function(x){return x.id === parseInt($("#select_list").val())})[0];
      var newTask = new Task(description, priority, list);
      newTask.build();
      $(".destroy-task").click(function(){
        $(this).parent().remove()
      });
      newTask.removeFromTasks();
    });
  };
};
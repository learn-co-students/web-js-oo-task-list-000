'use strict';

function List(title){
  this.id = List.all.length;
  this.title = title;
  this.tasks = [];

  List.all.push(this);
  this.listEl = function(){
    return "<div class=\"list\"><h2><button class=\"destroy-list\">x</button> " + this.title + "</h2><ul id=\"list-" + this.id + "\" data-id=\"" + this.id + "\"></ul></div>";
  }
  this.optionEl = function(){
    return "<option value=\"" + this.id + "\">" + this.title + "</option>";
  }
  this.build = function(){
    $("#select_list").append(this.optionEl());
    $("#lists").append(this.listEl());
  }
}

List.all = [];

function ListsController(){
  this.$addListForm = $('#add_list');
  this.$listTitleInput = $('#list_title');
  this.$selectListMenu = $('#select_list');
  this.$addTaskForm = $('#add_task');
  this.$wrapper = $('#wrapper');

  this.init = function(){
    this.$addTaskForm.hide();
    $("#add_list").submit(function(event){
      event.preventDefault();
      $('#add_task').show();
      var listName = $('#add_list input:first').val()
      var newList = new List(listName);
      newList.build();    
      $(".destroy-list").click(function(){
        $(this).parents("div").first().remove();
      });
    });
  };

};
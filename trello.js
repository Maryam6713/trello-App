function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

  }
  
  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    
  }
  
  //------------------------------------------------------------
  
  var cursorDot = document.querySelector("#cursor-dot")
  var cursorLine = document.querySelector("#cursor-outline")
  
  
  window.addEventListener("mousemove" , function(e){
  
      var posX = e.clientX
      var posY = e.clientY
  
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
  
      cursorLine.animate({
          left:`${posX}px`,
          top: `${posY}px`
  
      }, {duration: 500, fill : "forwards"})
  });
  




//----------------------------------------


function allowDrop(event) {
    event.preventDefault(); 
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add('dragging'); 
}

function drop(event) {
    event.preventDefault(); 
    var data = event.dataTransfer.getData("text/plain"); 
    var draggedElement = document.getElementById(data); 
    var dropZone = event.target;

    if (dropZone.classList.contains('lists') || dropZone.closest('.lists')) {
        dropZone = dropZone.closest('.lists'); 
        dropZone.appendChild(draggedElement); 
        draggedElement.classList.remove('dragging'); 
    }
}

function addTodo(listId) {
    var input = document.querySelector(`#${listId} ~ .input-container .inp`);
    var list = document.getElementById(listId);

    if (input.value.trim() !== "") {
        var li = document.createElement('li');
        li.id = `item-${Date.now()}`; 
        li.draggable = true;
        li.classList.add('todo-item');
        li.innerHTML = `<input type="text" value="${input.value}" disabled>
                        <div class="icons">
                            <i class="fas fa-edit" onclick="updt(event)"></i>
                            <i class="fas fa-trash" onclick="delt(event)"></i>
                        </div>`;
        li.ondragstart = drag; 
        list.appendChild(li);
        input.value = "";
    }
}

function clickTodo(event) {
    if (event.keyCode === 13) {
        addTodo(event.target.closest('.col').querySelector('ul.lists').id);
    }
}

function delt(event) {
    event.target.closest('li').remove();
}

function updt(event) {
    var input = event.target.closest('li').querySelector('input[type="text"]');
    input.disabled = false;
    input.focus();
    input.onblur = function () {
        input.disabled = true;
    };
}

function deleteAll(listId) {
    var list = document.getElementById(listId);
    if (list.children.length === 0) {
        swal("You have nothing to delete!");
    } else {
        swal({
            title: "Do you want to delete all items?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
        }).then((willDelete) => {
            if (willDelete) {
                list.innerHTML = '';
                swal("All items have deleted!", {
                    icon: "success",
                    buttons: "OK"
                });
            } else {
                swal("Deletion cancel kar diya gaya!");
            }
        });
    }
}


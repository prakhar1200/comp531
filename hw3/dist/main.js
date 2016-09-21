document.addEventListener("DOMContentLoaded", function() {
   document.getElementById('editStatusButton').onclick = function() {
       document.getElementById('editStatusButton').classList.add("hide");
       
       document.getElementById('editStatus').classList.remove("hide");
   };
   
   document.getElementById('changeStatus').onclick = function() {
       if(document.getElementById('statusBox').value ==="")
       {
           window.alert("Empty Status");
           return;
       }
       document.getElementById('statusText').textContent = document.getElementById('statusBox').value;
       document.getElementById('statusBox').value = "";
       
       document.getElementById('editStatusButton').classList.remove("hide");
       document.getElementById('editStatus').classList.add("hide");
   }
   
   document.getElementById('cancelStatus').onclick = function() {
       document.getElementById('statusBox').value = "";
        document.getElementById('editStatusButton').classList.remove("hide");
       document.getElementById('editStatus').classList.add("hide");
   }
   
   document.getElementById('clearPost').onclick = function () {
       document.getElementById('postText').value="";   }
   
});


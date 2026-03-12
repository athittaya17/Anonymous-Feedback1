function sendReply(id){

let input = document.getElementById("reply-"+id)

let msg = input.value.trim()

if(msg===""){
alert("กรุณาพิมพ์คำตอบก่อน")
return
}

let data = JSON.parse(localStorage.getItem("issues")) || []

for(let i=0;i<data.length;i++){

if(String(data[i].id) === String(id)){

data[i].reply = msg

}

}

localStorage.setItem("issues",JSON.stringify(data))

alert("ส่งคำตอบเรียบร้อย")

loadIssues()

}// เปลี่ยนหน้า
function showPage(page){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(page).classList.add("active")

}

// สร้าง Tracking ID
function generateID(){

return "UNI-"+Math.floor(Math.random()*1000000)

}


// ============================
// SUBMIT FEEDBACK
// ============================

const form=document.getElementById("feedbackForm")

if(form){

form.addEventListener("submit",function(e){

e.preventDefault()

let category=document.getElementById("category").value
let message=document.getElementById("message").value

let trackingID=generateID()

let issue={

id:Date.now(),

trackingID:trackingID,

category:category,

message:message,

status:"Pending",

reply:"",

time:new Date().toLocaleString()

}

let data=JSON.parse(localStorage.getItem("issues")) || []

data.push(issue)

localStorage.setItem("issues",JSON.stringify(data))

document.getElementById("result").innerHTML=
`Tracking ID : <b>${trackingID}</b>`

form.reset()

})

}



// ============================
// TRACK ISSUE
// ============================

function trackIssue(){

let id=document.getElementById("trackID").value

let data=JSON.parse(localStorage.getItem("issues")) || []

let f=data.find(x=>x.trackingID===id)

if(!f){

document.getElementById("trackResult").innerHTML="ไม่พบข้อมูล"

return

}

document.getElementById("trackResult").innerHTML=

`
<div class="issue">

<h3>${f.category}</h3>

<p>${f.message}</p>

<p><b>Status :</b> ${f.status}</p>

<p><b>Reply :</b> ${f.reply || "ยังไม่มีคำตอบจากผู้ดูแล"}</p>

<p>${f.time}</p>

</div>
`

}



// ============================
// ADMIN LOGIN
// ============================

function adminLogin(){

let u=document.getElementById("username").value
let p=document.getElementById("password").value

if(u==="admin" && p==="1234"){

localStorage.setItem("adminLogin","true")

window.location="admin.html"

}else{

document.getElementById("loginResult").innerHTML="Login Failed"

}

}



// ============================
// CHECK LOGIN
// ============================

function checkLogin(){

if(localStorage.getItem("adminLogin")!=="true"){

window.location="admin-login.html"

}

}



// ============================
// LOGOUT
// ============================

function logout(){

localStorage.removeItem("adminLogin")

window.location="index.html"

}



// ============================
// LOAD ADMIN ISSUES
// ============================

function loadIssues(){

let data=JSON.parse(localStorage.getItem("issues")) || []

let list=document.getElementById("issueList")

if(!list) return

list.innerHTML=""

data.reverse().forEach(i=>{

let div=document.createElement("div")

div.className="issue"

div.innerHTML=

`

<h3>${i.category}</h3>

<p>${i.message}</p>

<p>${i.trackingID}</p>

<select onchange="updateStatus(${i.id},this.value)">

<option ${i.status=="Pending"?"selected":""}>Pending</option>

<option ${i.status=="In Progress"?"selected":""}>In Progress</option>

<option ${i.status=="Resolved"?"selected":""}>Resolved</option>

<option ${i.status=="Rejected"?"selected":""}>Rejected</option>

</select>

<textarea id="reply-${i.id}" placeholder="พิมพ์คำตอบ">${i.reply || ""}</textarea>

<button onclick="sendReply(${i.id})">Send Reply</button>

`

list.appendChild(div)

})

}



// ============================
// UPDATE STATUS
// ============================

function updateStatus(id,status){

let data=JSON.parse(localStorage.getItem("issues")) || []

data.forEach(i=>{

if(String(i.id)===String(id)){

i.status=status

}

})

localStorage.setItem("issues",JSON.stringify(data))

}



// ============================
// SEND REPLY
// ============================

function sendReply(id){

let input=document.getElementById("reply-"+id)

if(!input){

alert("ไม่พบช่องตอบกลับ")

return

}

let msg=input.value.trim()

if(msg===""){

alert("กรุณาพิมพ์คำตอบก่อน")

return

}

let data=JSON.parse(localStorage.getItem("issues")) || []

data.forEach(i=>{

if(String(i.id)===String(id)){

i.reply=msg

}

})

localStorage.setItem("issues",JSON.stringify(data))

alert("ส่งคำตอบเรียบร้อย")

loadIssues()

}



// ============================
// SEARCH ISSUE
// ============================

function searchIssue(){

let input=document.getElementById("searchBox").value.toUpperCase()

let cards=document.querySelectorAll(".issue")

cards.forEach(c=>{

if(c.innerText.toUpperCase().includes(input)){

c.style.display="block"

}else{

c.style.display="none"

}

})

}



// ============================
// AUTO LOAD ADMIN
// ============================

if(document.getElementById("issueList")){

loadIssues()

}
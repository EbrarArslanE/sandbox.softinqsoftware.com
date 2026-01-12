function ytLoad(){
  const link = document.getElementById("ytLink").value;
  const frame = document.getElementById("ytFrame");

  let id;

  if(link.includes("v="))
    id = link.split("v=")[1].split("&")[0];
  else if(link.includes("youtu.be"))
    id = link.split("youtu.be/")[1].split("?")[0];
  else{
    alert("Kanka doğru link ver 😄");
    return;
  }

  frame.src = "https://www.youtube.com/embed/" + id;
}

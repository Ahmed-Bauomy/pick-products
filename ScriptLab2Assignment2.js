let numOfImages=8;
let randomNumArry=[];
let products=0;
for(let i=0;i<numOfImages;i++){
    randomNumArry.push(Math.round(1+Math.random()*9));            //random  
}
window.addEventListener("load",function(){

//let imgArray=this.document.querySelectorAll("img");       //all images
let upDiv=this.document.querySelector(".UpDiv");          //upper box
let downDiv=this.document.querySelector(".DownDiv");      //lower box

let dropedInLowerDivFlage=false;
let dropedInUpperDivFlage=false;
let startFromlowerFlag=false;
let startFromUpperFlag=false;

//images events
for(let i=0;i<numOfImages;i++){
    let container=this.document.createElement("div");     //creat div container in run time
    let imgObj=this.document.createElement("img");      //creat images in run time
    let label=this.document.createElement("label");      //creat label for the number of products
    imgObj.src=`products/${i+1}.jpg`;
    imgObj.name=`${randomNumArry[i]}`;
    imgObj.id=`${i+1}`;
    container.id=`${i+1}`;                                      //ralate the div with it's image by id
    label.innerText=`${randomNumArry[i]} products`;
    container.appendChild(imgObj);
    container.appendChild(label);
    container.classList.add("container");
    upDiv.appendChild(container);
    
    imgObj.ondragstart=function(event){            //ondragestart in upper images
        
       event.dataTransfer.setData("dragedImageSrc",event.target.src);
       event.dataTransfer.setData("dragedImageName",event.target.name);
       event.dataTransfer.setData("dragedImageId",event.target.id);
       startFromUpperFlag=true;

    }

    imgObj.ondragend=function(event){              //ondragend
       event.preventDefault();
      if(dropedInLowerDivFlage && startFromUpperFlag){              //drop in lower Div
      products=parseInt(event.target.name);
      if(products>1){
          products--;
          event.target.name=`${products}`;
          event.target.nextElementSibling.innerText=`${products} products`;
      }else{
        this.parentElement.style.visibility="hidden";
        products--;
        event.target.name=`${products}`;
        numOfImages--;
        
      }
      dropedInLowerDivFlage=false;
      startFromUpperFlag=false;
      }
      if(numOfImages==0){
        upDiv.innerText="Empty";
       upDiv.classList.add("empty");
    }
    
    }
}//end of image creation and image events


//for transport from upper box to lower box

//upper box events
upDiv.ondragleave=function(event){                       //ondragleave
  event.preventDefault();
}

//lower box events
downDiv.ondragenter=function(event){                    //ondragenter
    event.preventDefault();
    this.style.boxShadow="blue 10px 10px 100px inset";
}
downDiv.ondrop=function(event){                          //ondrop in lower
    event.preventDefault();
    if(!startFromlowerFlag){
    let newImgObj=document.createElement("img");
    newImgObj.src= event.dataTransfer.getData("dragedImageSrc");
    newImgObj.name= event.dataTransfer.getData("dragedImageName");
    newImgObj.id= event.dataTransfer.getData("dragedImageId");
    //the transported image events
    newImgObj.ondragstart=function(event){             //ondragstart in lower images
      event.dataTransfer.setData("dragedImagetoUpper",event.target.id);
      startFromlowerFlag=true;
    }
    newImgObj.ondragend=function(event){                     //ondragend
     event.preventDefault();
     if(dropedInUpperDivFlage && startFromlowerFlag){                 //drop in upper div
        event.target.remove();
       dropedInUpperDivFlage=false;
       startFromlowerFlag=false;
     }
    }
    //end of events
    this.appendChild(newImgObj);
    dropedInLowerDivFlage=true;
}
}
downDiv.ondragover=function(event){                     //ondragover
    event.preventDefault();
}

//for transport from lower box to upper box

//lower box events
downDiv.ondragleave=function(event){         //ondragleave
   event.preventDefault();
}

//upper box events

upDiv.ondragenter=function(event){      //ondragenter
    event.preventDefault();
}

upDiv.ondrop=function(event){        //ondrop in upper
    event.preventDefault();
    if(!startFromUpperFlag){
   var divId= event.dataTransfer.getData("dragedImagetoUpper");
    var selectedDiv= document.getElementById(`${divId}`);
    selectedDiv.style.visibility="";
    var oldName=parseInt(selectedDiv.children[0].name);
    oldName++;
    selectedDiv.children[0].name=`${oldName}`;
    selectedDiv.children[1].innerText=`${oldName} products`;
 
   dropedInUpperDivFlage=true;
}else{
    startFromUpperFlag=false;
}
}

upDiv.ondragover=function(event){      //onfragover
    event.preventDefault();
}

















});//end of load
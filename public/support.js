function find(user,list){


    for(var key in list){
        if(list[key].name==user)
        {
            return key;
        }

    }
    return -1;
}

function findJ(arr, name){
    for(var key in arr){
        if(arr[key]["name"]==name){
            return arr[key]["bg"];
        }
    }
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
 function refreshColors(list,room){
    let color;

    do{
        var letters = '0123456789ABCDEF';
        color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    }while(findColor(color,list,room)!=-1 || (color=='#fffff'|| color=='#00000'));
    list[list.length-1]['color']=color;
}
function countinroom(list,room) {
    let count=0;
    for(var key in list){
        if(list[key].room==room)
        {
           count++;
        }

    }
    return count;
}
function findColor(color, list,room){
    for(var key in list){
        if(list[key].room==room && list[key]['color']==color)
        {
            return key;
        }

    }
    return -1;
}

module.exports.find=find;
module.exports.findJ=findJ;
module.exports.refreshColors=refreshColors;
module.exports.countinroom=countinroom;

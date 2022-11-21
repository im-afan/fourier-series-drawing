pos_x = [];
pos_y = [];
drawingState = 0; //0 = before drawing, 1 = during drawing, 2 = after drawing
radii = [];
time = 0;
center_masses = [];
const ACCURACY = 10;
//pen_trail = new ListNode(null, {x: 0, y: 0}, null);

debug = true;

pen_trail = []

function update_pen_trail(x, y){
    
}

function mouseClicked(){
    drawingState++;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}

function update_beforedrawing(){
    
}

function update_drawing(){
    fill(0);
        
    //if(movedX > 1){
        pos_x.push(mouseX);
    //} 

    //if(movedY > 1){
        pos_y.push(mouseY);
    //}

    circle(mouseX, mouseY, 10);
}

function update_notdrawing(){
    if(debug){
        background(255);
    }
    


    //console.log("new frame");
    //console.log("window dimensions: " + windowWidth + " " + windowHeight);

    if(radii.length == 0){
        /*let coords = parse_svg("path3743");
        for(let i = 0; i < coords.length; i++){
            pos_x.push(coords[i].re);
            pos_y.push(coords[i].im);
        }*/
        radii = calculate_fourier_series(pos_x, pos_y, ACCURACY);
        //radii[ACCURACY] = math.add(radii[ACCURACY], math.complex(-200, -500));
        //radii[ACCURACY] = math.multiply(radii[ACCURACY], 1/2);
        for(let i = 0; i < radii.length; i++){
            //if(i != ACCURACY){
                radii[i] = math.multiply(radii[i], 1/2);
            //}
        }
        console.log(radii);
    }
    let centers = evaluate_fourier_series(radii, time);
    //console.log(centers);
    noFill();

    line(0, 0, centers[0].re, centers[0].im);
    for(var i = 1; i < centers.length; i++){
        //let pos = centers[i];
        //console.log(pos);
        //console.log("center: " + math.add(math.complex(500, 500), math.multiply(100, pos)) + " radius: " + math.multiply(radii[i], 100));
        //circle(pos.re, pos.im, 2);
        //let radius = math.add(math.multiply(math.complex({abs: 1, arg:2*Math.PI*time}), radii[i]), pos).toPolar();
        //let rad = math.add(centers[i], math.multiply(-1, centers[i-1]));
        //let radius_coord = math.complex({abs: radius.r, arg: radius.phi});
        if(debug){
            //line(pos.re/2 + windowWidth/2, pos.im/2 + windowHeight/2, centers[i-1].re/2 + windowWidth/2, centers[i-1].im/2 + windowHeight/2);
            line(centers[i].re, centers[i].im, centers[i-1].re, centers[i-1].im);
            //let vec = math.subtract(pos, centers[i-1]);
            //console.log(vec)
            //circle(centers[i-1].re, centers[i-1].im, vec.toPolar().r);
        }
        //circle(pos.re, pos.im, radii[i].toPolar().r);
    }
    circle(centers[centers.length-1].re, centers[centers.length-1].im, 20);
    
    pen_trail.push(centers[centers.length-1]);

    for(var i = 0; i < pen_trail.length; i++){
        fill(255, 0, 0);
        circle(pen_trail[i].re, pen_trail[i].im, 2);
    }

    /*for(var i = 0; i < center_masses.length; i++){
        fill(255, 0, 0);
        circle(center_masses[i].re, center_masses[i].im, 40);
    }*/

    /*for(var i = 0; i < pos_x.length; i++){
        fill(0);
        circle(pos_x[i], pos_y[i], 10);
    }*/
    
    if(time % 6.28 >= 6.279){
        pen_trail = [];
    }
    time += 0.01;

}

function draw(){
    switch(drawingState){
        case 0:
            update_beforedrawing();
            break;
        case 1:
            update_drawing();
            break;
        case 2:
            update_notdrawing();
            break;
    }
}
function make_complexlist(x, y){
    console.log(x);
    console.log(y);
    let ret = [];
    for(var i = 0; i < x.length; i++){
        ret.push(math.complex(x[i], y[i]));
    }

    return ret;
}

function center_mass(complex_coords){
    console.log("calc center of mass for new shape");
    let ret = math.complex(0, 0);
    let a = 255* Math.round(Math.random(0, 1));
    let b = 255 * Math.round(Math.random(0, 1));
    let c = 255 * Math.round(Math.random(0, 1));
    
    for(var i = 0; i < complex_coords.length; i++){
        // fill(a, b, c);
        //circle(complex_coords[i].re, complex_coords[i].im, 20);
        ret = math.add(ret, complex_coords[i]);
        console.log(ret);
    }
    //return ret/complex_coords.length;
    //console.log(math.multiply(ret, 1/complex_coords.length));
    return math.multiply(ret, 1/complex_coords.length);
}

function center_mass_interpolate(complex_coords){
    let ret = math.complex(0, 0);
    let total_points = 0;

    for(var i = 0; i < complex_coords.length-1; i++){
        let vec = math.subtract(complex_coords[i+1], complex_coords[i]);
        let dist = vec.abs();
        console.log(dist);
        for(let j = 0; j < 1; j += 1/dist){
            let weighted_1 = math.multiply(complex_coords[i], j);
            let weighted_2 = math.multiply(complex_coords[i+1], 1-j);
            ret = math.add(ret, math.add(weighted_1, weighted_2));
            total_points++;
        }
    }

    return math.multiply(ret, 1/total_points);
}

function calc_constant(n, complex_coords){
    let multiplied = [];
    for(var i = 0; i < complex_coords.length; i++){
        multiplied.push(math.multiply(complex_coords[i], math.complex({abs: 1, arg: - 2 * Math.PI * n * (i/complex_coords.length)})));
        //circle(multiplied[i].re, multiplied[i].im, 20);
    }
    //var c = center_mass_interpolate(multiplied);
    let c = center_mass(multiplied);
    //fill(0, 255, 0);
    center_masses.push(c);
    circle(c.re, c.im, 50);

    return c;
}

function evaluate_fourier_series(radii, t){
    var lowest_vel = -Math.floor(radii.length/2);
    var cur = math.complex(0, 0);
    var centers = [];

    //console.log(radii.length);

    for(var i = Math.floor(radii.length/2); i < radii.length; i++){
        //console.log(i);
        //console.log(radii.length -i -1);
        var piece = math.multiply(radii[i], math.complex({abs: 1, arg: 2*Math.PI*t*(lowest_vel+i)}));
        //console.log(t*(lowest_vel+i));
        cur = math.add(cur, piece);
        centers.push(cur);
        
        piece = math.multiply(radii[radii.length-i-1], math.complex({abs: 1, arg:2*Math.PI*t*(lowest_vel+radii.length-i-1)}));
        cur = math.add(cur, piece);
        centers.push(cur);
    }

    //console.log(cur);

    return centers;
}

function calculate_fourier_series(x, y, accuracy=20){
    let complex_coords = make_complexlist(x, y);
    let radii = []

    let fourier_series = {
        nonnegative: [],
        negative: []
    };

    for(var velocity = -accuracy; velocity <= accuracy; velocity++){
        //radii.push(math.divide(calc_constant(velocity, complex_coords), 2));
        radii.push(calc_constant(velocity, complex_coords));
    }

    //radii[0] = math.divide(radii[0], 2);
/*
    for(var velocity = -accuracy; velocity < 0; velocity++){
        fourier_series.negative.push(calc_constant(velocity, complex_coords));
    }

    for(var velocity = 0; velocity <= accuracy; velocity++)
*/
    return radii;
}
function parse_svg(id){
    let svg = document.getElementById(id);
    let ret = [];

    console.log(svg);
    console.log(typeof svg);

    svg.getTotalLength()

    let path_length = svg.getTotalLength();
    let samples = 1000;
    let step_length = path_length/samples;

    for(let t = 0; t <= samples; t++){
        let p = svg.getPointAtLength(t*step_length);
        ret.push(math.complex(p.x, p.y));
    }

    return ret;
}
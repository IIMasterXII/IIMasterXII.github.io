import * as THREE from './three.module.js';

var camera, scene, renderer, composer;
const raycaster = new THREE.Raycaster();
var container = document.querySelector('.scene');
const mouse = new THREE.Vector2();
var planes;
var selectedObject = null;
var clickedObject = null;
var highlight;
var isMobile = false;
var canvas;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;




init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    camera = new THREE.PerspectiveCamera( 90, 2, 0.1, 200 );

    camera.position.z = 90;

    //light
    let ambient = new THREE.AmbientLight(0x777777);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0x777777);
    directionalLight.position.set(0,1,1);
    scene.add(directionalLight);

    planes = new THREE.Group();
    var geometry = new THREE.PlaneGeometry(70, 50);

    var texture = new THREE.TextureLoader().load( 'textures/web1.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = -80;
    plane.position.y = 55;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web2.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.y = 55;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web3.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = 80;
    plane.position.y = 55;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web4.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = -80;
    plane.position.y = 0;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web5.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.y = 0;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web6.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = 80;
    plane.position.y = 0;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web7.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = -80;
    plane.position.y = -55;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web8.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.y = -55;
    planes.add( plane );

    var texture = new THREE.TextureLoader().load( 'textures/web9.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = 80;
    plane.position.y = -55;
    planes.add( plane );

    scene.add(planes);

    geometry = new THREE.PlaneGeometry(75, 55);
    var material = new THREE.MeshBasicMaterial( { color: 0xff3b3b } );
    highlight = new THREE.Mesh( geometry, material );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio * 1 );
    container.appendChild( renderer.domElement );

    canvas = renderer.domElement;
    onWindowResize();


    //events
    canvas.addEventListener( 'click', onCanvasClick, false );
    document.querySelector(".overlay").addEventListener( 'click', onOverlayClick, false );
    document.querySelector(".scene").addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function animate() {
    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}

function changeGrid(mobile){
    if(mobile){
        planes.position.z = -40;
        planes.children[0].position.x = -80;
        planes.children[0].position.y = 70;
        planes.children[1].position.x = 0;
        planes.children[1].position.y = 70;
        planes.children[2].position.x = 80;
        planes.children[2].position.y = 70;
        planes.children[3].position.x = -80;
        planes.children[3].position.y = 0;
        planes.children[4].position.x = 0;
        planes.children[4].position.y = 0;
        planes.children[5].position.x = 80;
        planes.children[5].position.y = 0;
        planes.children[6].position.x = -80;
        planes.children[6].position.y = -70;
        planes.children[7].position.x = 0;
        planes.children[7].position.y = -70;
        planes.children[8].position.x = 80;
        planes.children[8].position.y = -70;
    } else {
        planes.position.z = 0;
        planes.children[0].position.x = -80;
        planes.children[0].position.y = 55;
        planes.children[1].position.x = 0;
        planes.children[1].position.y = 55;
        planes.children[2].position.x = 80;
        planes.children[2].position.y = 55;
        planes.children[3].position.x = -80;
        planes.children[3].position.y = 0;
        planes.children[4].position.x = 0;
        planes.children[4].position.y = 0;
        planes.children[5].position.x = 80;
        planes.children[5].position.y = 0;
        planes.children[6].position.x = -80;
        planes.children[6].position.y = -55;
        planes.children[7].position.x = 0;
        planes.children[7].position.y = -55;
        planes.children[8].position.x = 80;
        planes.children[8].position.y = -55;
    }
}

//Events
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    if(!isMobile && canvas.clientWidth <= 1024){
        isMobile = true;
        changeGrid(isMobile);
    } else if(isMobile && canvas.clientWidth > 1024){
        isMobile = false;
        changeGrid(isMobile);
    }
    camera.updateProjectionMatrix();
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
}

function onDocumentMouseMove( event ) {
    event.preventDefault();

    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
    mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

    planes.lookAt(mouse.x,mouse.y,50);

    if ( selectedObject ) {
        planes.remove( highlight );
        selectedObject.position.z -= 5 ;
        selectedObject = null;
        document.querySelector(".scene").style.cursor = "initial";
    }

    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObject( planes, true );

    if ( intersects.length > 0 ) {

        const res = intersects.filter( function ( res ) {

            return res && res.object;

        } )[ 0 ];

        if ( res && res.object ) {
            selectedObject = res.object;
            highlight.position.x  = selectedObject.position.x;
            highlight.position.y  = selectedObject.position.y;
            highlight.position.z  = 4;
            planes.add( highlight );
            selectedObject.position.z += 5;
            document.querySelector(".scene").style.cursor = "pointer";
        }

    }

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouse.x = event.touches[ 0 ].pageX - windowHalfX;
        mouse.y  = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouse.x = event.touches[ 0 ].pageX - windowHalfX;
        mouse.y = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onCanvasClick( event ){
    if ( selectedObject ) {
        moveGrid(0.3, false);
        let overlay = document.querySelector('.overlay');
        let index = planes.children.indexOf(selectedObject) + 1;
        overlay.style.display = "grid";
        setTimeout(()=>{
            overlay.style.opacity = "1";
        },1)
        getOverlayData(index)
        clickedObject = index;
    }
}

function onOverlayClick(event){
    if (clickedObject){
        moveGrid(0.3, true);
        let overlay = document.querySelector('.overlay');
        overlay.style.opacity = "0";
        setTimeout(()=>{
            overlay.style.display = "none";
        },500)
        document.querySelector('.overlay-image').dataset.image = 0;
        document.querySelector('.overlay .content').innerHTML = "";
        clickedObject = 0;
    }
}

function moveGrid(seconds, forwards){
    let percent = 0;
    const interval = setInterval(() => {
        planes.position.z = forwards ? -((isMobile ? 20 : 0) + 60 + -60 * easeInOutSine(percent)) : (isMobile ? -20 : 0) + -60 * easeInOutSine(percent);
        percent += 0.01;
        if(percent >= 1) {
            clearInterval(interval);
        }
    }, (seconds *  1000) / 100);
}

function easeInOutSine(x){
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function getOverlayData(index){
    document.querySelector('.overlay-image').dataset.image = index;
    let content = document.querySelector('.overlay .content');
    let title = document.createElement("h4");
    let description = document.createElement("p");
    let link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.innerText = `More...`;
    switch(index){
        case 1:
            title.classList.add("text-primary")
            title.innerText = "VISION3 LIGHTING";
            content.appendChild(title);
            description.innerText = `I started my work at Vision3 Lighting in 2018. The website was completely revitalized on the front-end and back-end. Most of my work included making the website user-friendly to improve customer traction. In addition, I helped build and populate their database using Amazon Web Services and Django.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://www.vision3lighting.com/');
            content.appendChild(link);
            break;
        case 2:
            title.classList.add("text-primary")
            title.innerText = "FRESNO VALVES & CASTINGS";
            content.appendChild(title);
            description.innerText = `The Fresno Valves & Castings website was another project I was in charge of at Vision3 Lighting. The website was completely revitalized on the front-end and back-end. Most of my work included making the website user-friendly to improve customer traction. In addition, I helped build and populate their database using Amazon Web Services and Django.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://www.staging.fresnovalves.com/');
            content.appendChild(link);
            break;
        case 3:
            title.classList.add("text-primary")
            title.innerText = "GREATER COMMONS";
            content.appendChild(title);
            description.innerText = `A website for teachers to create their own online teaching courses. Courses came with videos, text, and files that could be uploaded by the teacher. When I was at Greater Commons, I was in charge of the Front End Development. Styling the front page, login, and course creation were all included in my work.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://www.greatercommons.com/');
            content.appendChild(link);
            break;
        case 4:
            title.classList.add("text-primary")
            title.innerText = "TWITTER CLONE";
            content.appendChild(title);
            description.innerText = `A small project I made in my free time. It functions exactly like its name, a "Twitter Clone". Users can sign up, create their profiles, and like/comment on posts. I implemented followers and private accounts to control what exactly shows up on your twitter feed. Most of the website was made in Javascript and Django.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://github.com/IIMasterXII/twitter-clone');
            content.appendChild(link);
            break;
        case 5:
            title.classList.add("text-primary")
            title.innerText = "MARS";
            content.appendChild(title);
            description.innerText = `Mars is a simple recruitment website made using MongoDB, Node, Express, and React. I made this website to practice my skills with handling user created forms in React and Node.js.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://mars-frontier.herokuapp.com/');
            content.appendChild(link);
            break;
        case 6:
            title.classList.add("text-primary")
            title.innerText = "STREAMER";
            content.appendChild(title);
            description.innerText = `This was one of my small side projects. I wanted to imitate the interface of a typical streaming service. Streamer is completely made in React with Redux, and has no back-end involvement. Currently, only the front-end is functional with some small features missing. The media listed are just placeholders`;
            content.appendChild(description);
            link.setAttribute('href', 'https://immense-sea-59587.herokuapp.com/');
            content.appendChild(link);
            break;
        case 7:
            title.classList.add("text-primary")
            title.innerText = "FANTASY RACES";
            content.appendChild(title);
            description.innerText = `This small project was made using MongoDB, Node, Express, and React. Fantasy Races functions as a 16 type Personality Quiz, and it records the results of its users.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://fantasyraces.herokuapp.com/');
            content.appendChild(link);
            break;
        case 8:
            title.classList.add("text-primary")
            title.innerText = "REACT GAME";
            content.appendChild(title);
            description.innerText = `A small project made entirely with React. This was one of my first projects with React. I just wanted to create a character select screen and inventory system that is functional with React.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://github.com/IIMasterXII/react-demo');
            content.appendChild(link);
            break;
        case 9:
            title.classList.add("text-primary")
            title.innerText = "TABULA";
            content.appendChild(title);
            description.innerText = `A small project that functioned like an anonymous Discord. Users were allowed to join text channels using codes, and talk freely with other anonymous users. I completed this project during a Hackathon at Fresno State University. I even ended up winning an award.`;
            content.appendChild(description);
            link.setAttribute('href', 'https://github.com/IIMasterXII/hackfresno2017-site');
            content.appendChild(link);
            break;
    }
}



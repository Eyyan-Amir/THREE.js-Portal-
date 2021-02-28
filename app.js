let scene,sceneLight,portalLIght,camera,renderer,clock,portParticles=[],smokeParticles=[];

const initScene=()=>{

    scene = new THREE.Scene();

    sceneLight = new THREE.DirectionalLight(0xffffff,0.5);
    sceneLight.position.set(0,0,1);
    scene.add(sceneLight);

    portalLIght = new THREE.PointLight(0x062d89 ,30,650,1.7);
    portalLIght.position.set(0,0,250);      //light Direction from to  back
    scene.add(portalLIght)

    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z=1000;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000,1);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particleSetup();
}
    const particleSetup=()=>{

        let loader = new THREE.TextureLoader();
        loader.load("smokes.png",(texture)=>{
            portalGeo = new THREE.PlaneBufferGeometry(350,350);
            portalMaterial = new THREE.MeshStandardMaterial({
                map:texture,
                transparent:true
            });
            smokeGeo = new THREE.PlaneBufferGeometry(1000,1000);
            smokeMaterial = new THREE.MeshStandardMaterial({
                map:texture,
                transparent:true
            });
            for (let p = 880 ;p > 250; p--){
                let mesh = new THREE.Mesh(portalGeo,portalMaterial);
                mesh.position.set(
                    0.5 * p * Math.cos((4 * p * Math.PI)/180),
                    0.5 * p * Math.sin((4 * p * Math.PI)/180),
                    0.1 * p
                );
                mesh.rotation.z=Math.random()*360;
                portParticles.push(mesh);
                scene.add(mesh);
            }
            for (let p = 0 ;p < 40; p++){
                let mesh = new THREE.Mesh(smokeGeo,smokeMaterial);
                mesh.position.set(
                    Math.random()* 1000 -500,
                    Math.random()* 400 -200,
                    25
                );
                // console.log( Math.random()* 1000 -500,
                // Math.random()* 400 -200,
                // 25)
                mesh.rotation.z=Math.random()*360;
                mesh.material.opacity = 0.4;
                portParticles.push(mesh);
                scene.add(mesh);
            }
            clock = new THREE.Clock();
            animate();
           
            });
        }

        const animate=()=>{
            let delta = clock.getDelta();
            portParticles.forEach(p =>{
            p.rotation.z -= delta*1.5;
            })
            smokeParticles.forEach(p =>{
                p.rotation.z -= delta*.2;
                })
            if(Math.random() > 0.9){
                portalLIght.power = 350 + Math.random()*500;
            }
            renderer.render(scene,camera);
            requestAnimationFrame(animate);
        
    }
    initScene()

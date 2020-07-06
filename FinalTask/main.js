var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();
var cmap = [];
var currentOperation = 1;
var surfaces;
var currentTransfer = 1;
var currentMaterial = 3;
var currentShape = 1;
var currentColor = "0x000000";

$('#colorinput').hide();
$('#lbl').hide();
function main()
{
   
    transfer(currentTransfer,1);

    screen.init( volume, {
        width: 1200,
        height: 800,
        targetDom: document.getElementById('target'),
        enableAutoResize: true
    });

    if(currentMaterial != 1)
    {
        var light = new THREE.PointLight();
        light.position.set( 0, 0, 5 );
        screen.scene.add(light);
    }
    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    if(currentOperation == 1)
    {
        surfaces = null;
        var value = document.getElementById("iso").value;
        surfaces = Isosurfaces(volume, parseInt(value), cmap, currentMaterial, currentShape);


    }
    else
    {
        surfaces = null;
        var point = new THREE.Vector3(60,60,17);
        var normal = new THREE.Vector3(1,1,1);
        surfaces = SlicePlane( volume, point, normal, currentTransfer, currentShape, currentMaterial);
    }
    screen.scene.add( surfaces );
    surfaces.material.side = THREE.DoubleSide;
    if(currentShape != 1)
    {
        surfaces.material.color.setHex( currentColor);
        if(currentShape == 2)
            surfaces.scale.set( 25, 25, 25 );
        else
            surfaces.scale.set( 2, 2, 2 );
        surfaces.position.setX(60);
        surfaces.position.setY(70);
        surfaces.position.setZ(10);
    }
    screen.renderer.setClearColor( 0xffffff, 1);
    

    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });


    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
}


function calculate()
{
    $('canvas').remove();
    currentOperation = 1;

    main();
}

function slice()
{
     $('canvas').remove();
     currentOperation = 2;
     main();
}

$('#colorinput').on('input', function() {

    currentColor = jQuery(this).val().replace("#","0x");
    surfaces.material.color.setHex( currentColor );
});

$("#transfer").change(function() {
    if(this.checked) {

        $("#colorinput").prop("disabled", true);
        $("#colormaps").show();
    }
    else
    {

        $("#colorinput").prop("disabled", false);
        $("#colorinput")[0].click();
        $("#colormaps").hide();
    }
});

function transfer(c,method)
{
    cmap = [];
    currentTransfer = c;
    switch(c)
    {
        case 1:
            for ( var i = 0; i < 256; i++ )
            {
                var S = i / 255.0; // [0,1]
                var R = 1-Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
                var G = 1-Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
                var B = 1-Math.max( Math.cos( S * Math.PI ), 0.0 );
                var color = new THREE.Color( R, G, B );
                cmap.push( [ S, '0x' + color.getHexString() ] );
            }
        break;
        case 2:
            for ( var i = 0; i < 256; i++ )
            {
                var S = i / 255.0; // [0,1]
                var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
                var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
                var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
                var color = new THREE.Color( R, G, B );
                cmap.push( [ S, '0x' + color.getHexString() ] );
            }
        break;
        case 3:
            for ( var i = 0; i < 256; i++ )
            {
                var S = i / 255.0; // [0,1]
                var R = 1;
                var G = Math.max( Math.cos(  S * Math.PI/2 ), 0.0 );
                var B = Math.max( Math.cos(  S * Math.PI/2 ), 0.0 );
                var color = new THREE.Color( R, G, B );

                cmap.push( [ S, '0x' + color.getHexString() ] );
            }
        break;
        case 4:
            for ( var i = 0; i < 256; i++ )
            {
                var S = i / 255.0; // [0,1]
                var R = Math.max(0.5 - Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 ),0.0);
                var G = Math.max(0.5 - Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 ),0.0);
                var B = Math.max(0.5 - Math.max( Math.cos( S * Math.PI ), 0.0 ),0.0);
                var color = new THREE.Color( R, G, B );
                cmap.push( [ S, '0x' + color.getHexString() ] );
            }
            break;
    }
    if(method == 2)
    {
        $('canvas').remove();
        main();
    }


}

$( function() {

                $( '#cd-dropdown' ).dropdown( {
                    gutter : 4,
                    delay : 30,
                    random : false,
                    onOptionSelect: function(opt){
                        switch(opt.text())
                        {
                            case "MeshBasicMaterial":
                            currentMaterial = 1;
                            break;
                            case "MeshLambertMaterial":
                            currentMaterial = 2;
                            break;
                            case "MeshPhongMaterial":
                            currentMaterial = 3;
                            break;
                        }
                        $('canvas').remove();
                        main();
                    }
                } );

            });

$( function() {

                $( '#cd-dropdown1' ).dropdown( {
                    gutter : 4,
                    delay : 30,
                    random : false,
                    onOptionSelect: function(opt){

                        switch(opt.text())
                        {
                            case "Lobster":
                            $('#colormaps1').show();
                            $('#trf').show();
                            $('#colorinput').hide();
                            $('#lbl').hide();
                            currentShape = 1;
                            break;
                            case "Octahedron":
                            $('#colormaps1').hide();
                            $('#trf').hide();
                            $('#colorinput').show();
                            $('#lbl').show();
                            currentShape = 2;
                            break;
                            case "Sphere":
                            $('#colormaps1').hide();
                            $('#trf').hide();
                            $('#colorinput').show();
                            $('#lbl').show();
                            currentShape = 3;
                            break;
                        }
                        $('canvas').remove();
                        main();
                    }
                } );

            });
$( function() {

                $( '#cd-dropdown2' ).dropdown( {
                    gutter : 5,
                    delay : 30,
                    random : false,
                    onOptionSelect: function(opt){

                        switch(opt.text())
                        {
                            case "Rainbow-color":
                            transfer(2,2)
                            
                            break;
                            case "White-red":
                                transfer(3,2)
                            
                            break;
                            case "Dark-brown":
                                transfer(4,3)
                            break;
                        }
                        $('canvas').remove();
                        main();
                    }
                } );

            });


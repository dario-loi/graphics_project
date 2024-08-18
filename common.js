
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}


function gen_quad(resolution) {

    // generate a quad of side 1.0, centered at the origin, with the normal pointing in the positive z direction
    // the quad has a side of $resolution + 1$ vertices
    let vertices = [];
    let uvs = [];
    let normals = [];

    let step = 1.0 / (resolution - 1);

    start_x = 0.0;
    start_y = 1.0;

    for (let i = 0; i < (resolution - 1); i++) {
        for (let j = 0; j < (resolution - 1); j++) {
            // first triangle CCW
            //       2
            //      /|
            //    /  |
            //  /    |
            // 0-----1

            // vertex 0
            vertices.push(start_x + i * step);
            vertices.push(start_y - j * step);
            vertices.push(0.0);

            uvs.push(i * step);
            uvs.push(j * step);

            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);

            // vertex 1
            vertices.push(start_x + (i + 1) * step);
            vertices.push(start_y - j * step);
            vertices.push(0.0);

            uvs.push((i + 1) * step);
            uvs.push(j * step);
            
            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);

            // vertex 2
            vertices.push(start_x + i * step);
            vertices.push(start_y - (j + 1) * step);
            vertices.push(0.0);

            uvs.push(i * step);
            uvs.push((j + 1) * step);

            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);


            // second triangle CCW
            // 2------1
            // |     /
            // |   /
            // |/
            // 0
            
            // vertex 0

            vertices.push(start_x + i * step);
            vertices.push(start_y - (j + 1) * step);
            vertices.push(0.0);

            uvs.push(i * step);
            uvs.push((j + 1) * step);

            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);

            // vertex 1

            vertices.push(start_x + (i + 1) * step);
            vertices.push(start_y - j * step);
            vertices.push(0.0);

            uvs.push((i + 1) * step);
            uvs.push(j * step);

            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);

            // vertex 2
            vertices.push(start_x + (i + 1) * step);
            vertices.push(start_y - (j + 1) * step);
            vertices.push(0.0);

            uvs.push((i + 1) * step);
            uvs.push((j + 1) * step);

            normals.push(0.0);
            normals.push(0.0);
            normals.push(1.0);
        }
    }

    vert_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vert_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    uv_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uv_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    return {
        vertices: vert_buffer,
        uvs: uv_buffer,
        normals: normal_buffer,
        n_triangles: vertices.length / 9
    };
}


function LoadTexture( param )
{
	if ( param.files && param.files[0] ) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var img = document.getElementById('texture-img');
			img.onload = function() {
				meshDrawer.setTexture( img );
				DrawScene();
			}
			img.src = e.target.result;
		};
		reader.readAsDataURL( param.files[0] );
	}
}
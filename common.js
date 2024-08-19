
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


function gen_quad(ctx, resolution) {

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

    vert_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vert_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

    uv_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, uv_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(uvs), ctx.STATIC_DRAW);

    normal_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, normal_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(normals), ctx.STATIC_DRAW);

    quad_vao = ctx.createVertexArray();
    ctx.bindVertexArray(quad_vao);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, vert_buffer);
    ctx.enableVertexAttribArray(0);

    ctx.vertexAttribPointer(0, 3, ctx.FLOAT, false, 0, 0);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, uv_buffer);
    ctx.enableVertexAttribArray(1);
    ctx.vertexAttribPointer(1, 2, ctx.FLOAT, false, 0, 0);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, normal_buffer);
    ctx.enableVertexAttribArray(2);

    ctx.vertexAttribPointer(2, 3, ctx.FLOAT, false, 0, 0);
    ctx.bindVertexArray(null);



    return {
        quad_vao: quad_vao,
        n_triangles: vertices.length / 9
    };
}

function gen_cube(ctx) {
    let vertices = [
        // front face
        -1.0, -1.0, 1.0, 
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

    // back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

    // top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

    // bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

    // right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

    // left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ];

    let uvs = [
        // front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

    // back face
        0.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,

    // top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

    // bottom face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

    // right face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

    // left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    let indices = [
        0, 1, 2, 0, 2, 3, // front face
        4, 5, 6, 4, 6, 7, // back face
        8, 9, 10, 8, 10, 11, // top face
        12, 13, 14, 12, 14, 15, // bottom face
        16, 17, 18, 16, 18, 19, // right face
        20, 21, 22, 20, 22, 23 // left face
    ];

    let vert_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vert_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);

    let uv_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, uv_buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(uvs), ctx.STATIC_DRAW);

    let index_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), ctx.STATIC_DRAW);

    let cube_vao = ctx.createVertexArray();
    ctx.bindVertexArray(cube_vao);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, vert_buffer);
    ctx.enableVertexAttribArray(0);
    ctx.vertexAttribPointer(0, 3, ctx.FLOAT, false, 0, 0);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, uv_buffer);
    ctx.enableVertexAttribArray(1);
    ctx.vertexAttribPointer(1, 2, ctx.FLOAT, false, 0, 0);

    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer);
    ctx.bindVertexArray(null);

    ctx.bindVertexArray(null);

    return {
        vao: cube_vao,
        n_elements: indices.length
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

class PerlinNoise {

    constructor(ctx, seed) {
        let noise_vs = `
            attribute vec4 aVertexPosition;
            attribute vec4 aVertexUv;
            varying highp vec2 vUv;
            void main(void) {
                // position goes from 0 to 1, make it span -1 to 1
                gl_Position = aVertexPosition * 2.0 - 1.0;
                vUv = aVertexUv.xy;
            }
        `;

        let noise_fs = `
            precision highp float;

            // HIGHER IS MORE
            #define AMPLITUDE 2.0

            float random (in vec2 st, in float seed) {
                return fract(cos(sin(dot(st.xy,
                                    vec2(12.9898,78.233))))*
                    43758.5453123 + seed);
            }

            // Based on Morgan McGuire @morgan3d
            // https://www.shadertoy.com/view/4dS3Wd
            float noise (in vec2 st, in float seed) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                // Four corners in 2D of a tile
                float a = random(i, seed);
                float b = random(i + vec2(1.0, 0.0), seed);
                float c = random(i + vec2(0.0, 1.0), seed);
                float d = random(i + vec2(1.0, 1.0), seed);

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }
            

            varying highp vec2 vUv;
            uniform vec2 uSampleOffset;
            uniform float uSeed;

            void main(void) {

                float v = noise((vUv + uSampleOffset) * AMPLITUDE, uSeed);

                gl_FragColor = vec4(v, v, v, 1.0);
            }
        `;
        
        this.program = initShaderProgram(ctx, noise_vs, noise_fs);
        this.program.info = {
            aVertexPosition: ctx.getAttribLocation(this.program, 'aVertexPosition'),
            aVertexUv: ctx.getAttribLocation(this.program, 'aVertexUv'),
            uSeed: ctx.getUniformLocation(this.program, 'uSeed'),
            uSampleOffset: ctx.getUniformLocation(this.program, 'uSampleOffset'),
        };
        this.target_quad = gen_quad(ctx, 2);
        this.target_framebuffer = ctx.createFramebuffer();
        this.seed = seed;
    }

    sample_perlin(ctx, texture, seed, width, height, x, y) {

        ctx.useProgram(this.program);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, this.target_framebuffer);

        ctx.framebufferTexture2D(ctx.FRAMEBUFFER, ctx.COLOR_ATTACHMENT0, ctx.TEXTURE_2D, texture, 0);

        ctx.bindVertexArray(this.target_quad.quad_vao);

        let last_width = ctx.drawingBufferWidth;
        let last_height = ctx.drawingBufferHeight;
        ctx.viewport(0, 0, width, height);
        ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
        
        ctx.uniform2f(this.program.info.uSampleOffset, x, y);
        ctx.uniform1f(this.program.info.uSeed, seed);
        ctx.drawArrays(ctx.TRIANGLES, 0, 6);

        ctx.bindVertexArray(null);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
        ctx.viewport(0, 0, last_width, last_height);
    }

}


class FBM {


    constructor(ctx) {
        let fbm_vs = `
            attribute vec4 aVertexPosition;
            attribute vec4 aVertexUv;
            varying highp vec2 vUv;
            void main(void) {
                // position goes from 0 to 1, make it span -1 to 1
                gl_Position = aVertexPosition * 2.0 - 1.0;
                vUv = aVertexUv.xy;
            }
        `;

        let fbm_fs = `
            precision highp float;

            // HIGHER IS MORE
            #define AMPLITUDE 2.0
            #define OCTAVES 8

            float random (in vec2 st, in float seed) {
                return fract(cos(sin(dot(st.xy,
                                    vec2(12.9898,78.233))))*
                    43758.5453123 + seed);
            }

            // Based on Morgan McGuire @morgan3d
            // https://www.shadertoy.com/view/4dS3Wd
            float noise (in vec2 st, in float seed) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                // Four corners in 2D of a tile
                float a = random(i, seed);
                float b = random(i + vec2(1.0, 0.0), seed);
                float c = random(i + vec2(0.0, 1.0), seed);
                float d = random(i + vec2(1.0, 1.0), seed);

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) +
                        (c - a)* u.y * (1.0 - u.x) +
                        (d - b) * u.x * u.y;
            }

            float fbm (in vec2 st, in float seed) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                for (int i = 0; i < OCTAVES; i++) {
                    value += amplitude * noise(st * frequency, seed);
                    frequency *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }

            varying highp vec2 vUv;
            uniform vec2 uSampleOffset;
            uniform float uSeed;

            void main(void) {

                float v = fbm((vUv + uSampleOffset) * AMPLITUDE, uSeed);

                gl_FragColor = vec4(v, v, v, 1.0);
            }
                `;
        
        this.program = initShaderProgram(ctx, fbm_vs, fbm_fs);
        this.program.info = {
            aVertexPosition: ctx.getAttribLocation(this.program, 'aVertexPosition'),
            aVertexUv: ctx.getAttribLocation(this.program, 'aVertexUv'),
            uSeed: ctx.getUniformLocation(this.program, 'uSeed'),
            uSampleOffset: ctx.getUniformLocation(this.program, 'uSampleOffset'),
        };

        this.target_quad = gen_quad(ctx, 2);
        this.target_framebuffer = ctx.createFramebuffer();
    }

    sample_fbm(ctx, texture, seed, width, height, x, y) {
        ctx.useProgram(this.program);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, this.target_framebuffer);

        ctx.framebufferTexture2D(ctx.FRAMEBUFFER, ctx.COLOR_ATTACHMENT0, ctx.TEXTURE_2D, texture, 0);

        ctx.bindVertexArray(this.target_quad.quad_vao);

        let last_width = ctx.drawingBufferWidth;
        let last_height = ctx.drawingBufferHeight;
        ctx.viewport(0, 0, width, height);
        ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
            
        ctx.uniform2f(this.program.info.uSampleOffset, x, y);
        ctx.uniform1f(this.program.info.uSeed, seed);
        ctx.drawArrays(ctx.TRIANGLES, 0, 6);

        ctx.bindVertexArray(null);
        ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
        ctx.viewport(0, 0, last_width, last_height);
    }
    
}


class ImageTexture2D {

    constructor(ctx, image_filepath, image_attrs) {
        this.texture = ctx.createTexture();
        this.image = new Image();
        this.image.onload = () => {

        ctx.bindTexture(ctx.TEXTURE_2D, this.texture);
        ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, this.image);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, image_attrs.wrap_s);
        ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, image_attrs.wrap_t);

        if(image_attrs.generate_mipmaps) {
            ctx.generateMipmap(ctx.TEXTURE_2D);
            ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR_MIPMAP_LINEAR);
            ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
        } else {
            ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
            ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
        }

            ctx.bindTexture(ctx.TEXTURE_2D, null);
        }

        this.image.src = image_filepath;
        
    }

}


class Cubemap {
    constructor(ctx, faces) {

        this.cubemap = ctx.createTexture();

        ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, this.cubemap);

        for (let i = 0; i < faces.length; i++) {

            const face_path = faces[i];
            let image = new Image();
            image.onload = () => {
                ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, this.cubemap);
                ctx.texImage2D(ctx.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, image);
                ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
            }
            image.src = face_path;
        }


        ctx.texParameteri(ctx.TEXTURE_CUBE_MAP, ctx.TEXTURE_WRAP_S, ctx.REPEAT);
        ctx.texParameteri(ctx.TEXTURE_CUBE_MAP, ctx.TEXTURE_WRAP_T, ctx.REPEAT);
        ctx.texParameteri(ctx.TEXTURE_CUBE_MAP, ctx.TEXTURE_WRAP_R, ctx.REPEAT);

        ctx.texParameteri(ctx.TEXTURE_CUBE_MAP, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR);
        ctx.texParameteri(ctx.TEXTURE_CUBE_MAP, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
        ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    }
}

class Skybox {
    constructor(ctx, cubemap) {

        let skybox_vs = `
            attribute vec4 aVertexPosition;
            varying highp vec3 vTexCoords;

            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;

            void main(void) {
                gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
                vTexCoords = aVertexPosition.xyz;
            }
        `;

        let skybox_fs = `
            precision highp float;

            varying highp vec3 vTexCoords;
            uniform samplerCube uCubemap;

            void main(void) {
                gl_FragColor = textureCube(uCubemap, vTexCoords);
            }
        `;

        this.program = initShaderProgram(ctx, skybox_vs, skybox_fs);
        this.program.info = {
            aVertexPosition: ctx.getAttribLocation(this.program, 'aVertexPosition'),
            uModelViewMatrix: ctx.getUniformLocation(this.program, 'uModelViewMatrix'),
            uProjectionMatrix: ctx.getUniformLocation(this.program, 'uProjectionMatrix'),
            uCubemap: ctx.getUniformLocation(this.program, 'uCubemap'),
        };

        this.cubemap = cubemap;

        this.skybox = gen_cube(ctx);
    }
}
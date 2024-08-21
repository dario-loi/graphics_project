# Fractal Brownian Motion (fBm) Terrain Generation


> [!WARNING]  
> Mouse movement does **not** work in Chrome, use Firefox for the best experience!

> [!IMPORTANT]
> The 4k textures are not included in the repository. You can download them from the following links:
> * Grass https://polyhaven.com/a/aerial_grass_rock
> * Snow https://polyhaven.com/a/snow_02
> * Skybox https://learnopengl.com/img/textures/skybox.zip
>
> Alternatively, you can find them all zipped in a release for this repository: https://github.com/dario-loi/graphics_project/releases/tag/textures
> 
> Place the textures in the `textures` folder and the skybox in the `skybox` folder and rename them according to the source code.

This project implements an infinite terrain generator through the use of fractal brownian motion (fBm). 

We use a set of chunks (quads with a fixed number of vertices) to generate the terrain. Each chunk has an 
associated heightmap that is generated using fBm. The heightmap is then used in the
vertex and fragment shaders to obtain displacement and normal information for the terrain.

The terrain is generated in real-time, and the user can move around the terrain using the arrow keys.

Face normals are calculated in the fragment shader, and the terrain is lit using a directional light, the absence of tessellation and geometry shaders in WebGL 2.0 makes the terrain look a bit blocky due to the TBN matrices being calculated without interpolation between vertices.

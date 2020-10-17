class RGBMesh extends Mesh
{
	/*
		Set up Mesh with appropriate args
		Set location references for color, normal attributes
		Create and populate buffers for color, normal attributes
	*/ 
	constructor(gl, program, positionArray, normalArray, colorArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, normalArray, indexArray, position, rotation, scale);

		this.colorAttribLocation = this.gl.getAttribLocation(this.program, "vertColor");
		this.colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, colorArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	}

	/*
		Call Mesh's activate
		Set up attribute arrays / pointers for color and normal attributes
	*/
	activate()
	{
		super.activate();
		this.gl.enableVertexAttribArray(this.colorAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
		this.gl.vertexAttribPointer(
			this.colorAttribLocation,
			3, this.gl.FLOAT, this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, 0
		);
	}

	deactivate()
	{
		super.deactivate();
		this.gl.disableVertexAttribArray(this.colorAttribLocation);
	}
}
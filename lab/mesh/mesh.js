class Mesh extends Transform
{
	/*
		Set up transform
		Set up WebGL references
		Create and populate position and index buffer objects
	*/
	constructor(gl, program, positionArray, normalArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(position, rotation, scale);

		this.gl = gl;
		this.program = program;

		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, "mWorld");
		this.mNormalUniformLocation = this.gl.getUniformLocation(this.program, "mNormal");

		this.positionAttribLocation = this.gl.getAttribLocation(this.program, "vertPosition");
		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); // yay paranoia!

		this.normalAttribLocation = this.gl.getAttribLocation(this.program, "vertNormal");
		this.normalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.indexLength = indexArray.length;
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}

	/*
		Update transform
		Use correct shader program
		Bind index array to element array buffer
		Bind position attribute buffer to array buffer
		Set up vertex attribute array / pointer for position attribute
	*/
	activate()
	{
		this.update();

		this.gl.useProgram(this.program);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.vertexAttribPointer(
			this.positionAttribLocation,
			3, this.gl.FLOAT, this.gl.FALSE, // 3 floats per vertex (for position), don't normalize
			3 * Float32Array.BYTES_PER_ELEMENT, 0 // 3 floats per vertex (for all data), skip 0 at start
		);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3, this.gl.FLOAT, this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, 0
		);

		this.gl.uniformMatrix4fv(
			this.mWorldUniformLocation,
			this.gl.FALSE, // don't transpose
			this.mWorld
		);

		this.gl.uniformMatrix3fv(
			this.mNormalUniformLocation,
			this.gl.FALSE,
			this.mNormal
		);
	}

	/*
		Call activate
		Draw elements burrrrrr
		Call deactivate
	*/
	draw()
	{
		this.activate();
		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.indexLength,
			this.gl.UNSIGNED_SHORT,
			0
		);
		this.deactivate();
	}

	deactivate()
	{
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.disableVertexAttribArray(this.positionAttribLocation);
		this.gl.disableVertexAttribArray(this.normalAttribLocation);
	}
}
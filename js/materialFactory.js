var materialFactory = {};

materialFactory.loadTextures = function () {
    this.textures = [];
    for (i = 0; i < textureNames.length; i++) {
        this.textures.push(THREE.ImageUtils.loadTexture('images/textures/' + textureNames[i][1]));
    }

    this.materials = [];
    for (i = 0; i < textureNames.length; i++) {
        if (textureNames[i][0] == 'grass') {
            this.textures[i].anisotropy = renderer.getMaxAnisotropy();
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            this.textures[i].repeat.set(12, 12);
        }
        if (textureNames[i][0] == 'block') {
            this.textures[i].anisotropy = renderer.getMaxAnisotropy();
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            this.textures[i].repeat.set(35, 35);
        }
        if (textureNames[i][0] == 'wall') {
            this.textures[i].anisotropy = renderer.getMaxAnisotropy();
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            this.textures[i].repeat.set(10, 10);
        }
        if (textureNames[i][0] == 'infgrass') {
            this.textures[i].anisotropy = renderer.getMaxAnisotropy();
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            this.textures[i].repeat.set(72, 72);
        }
        if (textureNames[i][0] == 'infriver') {
            this.textures[i].anisotropy = renderer.getMaxAnisotropy();
            this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
            this.textures[i].repeat.set(500, 500);
        }
        this.materials[i] = new THREE.MeshBasicMaterial({
            map: this.textures[i]
        });
    }

    initscene();
}

materialFactory.getMaterialByName = function (name) {
    for (i = 0; i < textureNames.length; i++) {
        if (name == textureNames[i][0]) {
            return this.materials[i];
        }
    }
}

materialFactory.getTextureByName = function (name) {
    for (i = 0; i < textureNames.length; i++) {
        if (name == textureNames[i][0]) {
            return this.textures[i];
        }
    }
}
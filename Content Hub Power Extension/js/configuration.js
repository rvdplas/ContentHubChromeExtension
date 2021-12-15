function initializeConfig() {
    let config = [];

    config.push(createConfig("Actions", true));
    config.push(createConfig("Schema", true));


    return config;
}

function createConfig(name, isActive) {
    return {
        id: name.toLocaleLowerCase,
        name: name,
        isActive: isActive
    }
}

var appConfig   = require('../config').config;
var Ice         = require('ice').Ice;
var Murmur      = require('./Murmur').Murmur;

class IceManager {

    constructor() {
        this.communicator = undefined;
        this.meta = undefined;
    }

    getMeta() {
        return Ice.Promise.try(
            () => {

                var iceOptions = new Ice.InitializationData();
                iceOptions.properties = Ice.createProperties([], iceOptions.properties);
                iceOptions.properties.setProperty('Ice.Default.EncodingVersion', '1.0');
                iceOptions.properties.setProperty('Ice.ImplicitContext', 'Shared');
                this.communicator = Ice.initialize(iceOptions);
                this.communicator.getImplicitContext().put('secret', appConfig.iceWritePassword);
                var base = this.communicator.stringToProxy("Meta:tcp -h "+ appConfig.murmurAdress +" -p "+ appConfig.murmurIcePort +"");
                this.meta = Murmur.MetaPrx.checkedCast(base);
                return this.meta;
            }
        )
    }


    getConfiguration() {
        if (this.meta) {
            return this.meta.then(
                (meta) => {
                    return meta.getDefaultConf().then(
                        (configuration) => {
                            return configuration;
                        })
                    })
        }
        return undefined;
    }

    getCommunicator() {
        return this.communicator
    }

    destoryCommunicator() {
        if (this.communicator)
            return this.communicator.destroy();
    }

}

exports.IceManager = IceManager;
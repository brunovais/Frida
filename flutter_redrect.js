/**
 11/2024
 This script redirects all flutter traffic to a proxy of your choice @android
 by @brunovais
 */

Interceptor.attach(Module.findExportByName(null, 'connect'), {
    onEnter: function(args) {
        var sockfd = args[0].toInt32();
        var addrPtr = args[1];
        var addrlen = args[2].toInt32();

        var family = Memory.readU16(addrPtr);

        if (family == 2) {
            var port = Memory.readU16(addrPtr.add(2));
            var ip = Memory.readU32(addrPtr.add(4));

            port = ((port & 0xFF) << 8) | ((port >> 8) & 0xFF);

            var ipStr = ((ip >> 24) & 0xFF) + '.' +
                        ((ip >> 16) & 0xFF) + '.' +
                        ((ip >> 8) & 0xFF) + '.' +
                        (ip & 0xFF);

            console.log('Conectando para ' + ipStr + ':' + port);

            var proxyIp = '<IP>';
            var proxyPort = 8080;

            Memory.writeU16(addrPtr.add(2), ((proxyPort >> 8) & 0xFF) | ((proxyPort & 0xFF) << 8));
            var proxyIpParts = proxyIp.split('.');
            Memory.writeU8(addrPtr.add(4), parseInt(proxyIpParts[0]));
            Memory.writeU8(addrPtr.add(5), parseInt(proxyIpParts[1]));
            Memory.writeU8(addrPtr.add(6), parseInt(proxyIpParts[2]));
            Memory.writeU8(addrPtr.add(7), parseInt(proxyIpParts[3]));

            console.log('Redirecionado para ' + proxyIp + ':' + proxyPort);
        }
    }
});

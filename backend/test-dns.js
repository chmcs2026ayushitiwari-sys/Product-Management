import dns from 'dns';
import fs from 'fs';

const name = '_mongodb._tcp.cluster0.40keyk6.mongodb.net';
dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv(name, (err, addresses) => {
    if (err) {
        fs.writeFileSync('result.txt', `Error: ${err.message}`);
    } else {
        fs.writeFileSync('result.txt', `Success: ${JSON.stringify(addresses)}`);

        // Also resolve TXT for replica set name
        dns.resolveTxt('cluster0.40keyk6.mongodb.net', (err, txts) => {
            if (err) {
                fs.appendFileSync('result.txt', `\nTXT Error: ${err.message}`);
            } else {
                fs.appendFileSync('result.txt', `\nTXT Records: ${JSON.stringify(txts)}`);
            }
        });
    }
});

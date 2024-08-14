// <!--GAMFC-->version base on commit 841ed4e9ff121dde0ed6a56ae800c2e6c4f66056, time is 2024-04-16 18:02:37 UTC<!--GAMFC-END-->.
// @ts-ignore
import { connect } from 'cloudflare:sockets';

const listProxy = [
    { path: '/id1', proxy: '35.219.50.99' },
    { path: '/id2', proxy: '202.10.42.30' },
    { path: '/id3', proxy: '202.10.42.30' },
    { path: '/id4', proxy: '104.99.186.73' },
    { path: '/id5', proxy: '104.106.206.73' },
    { path: '/sg1', proxy: '194.36.179.237' },
    { path: '/sg2', proxy: '210.87.110.230' },
    { path: '/sg3', proxy: '104.248.145.216' },
    { path: '/us1', proxy: '35.219.50.99' },
    { path: '/us2', proxy: '202.10.42.30' },
    { path: '/my1', proxy: '23.37.81.73' },
    { path: '/jp1', proxy: '43.153.181.217' },
];

let proxyIP;
export default {
    async fetch(request, ctx) {
        try {
            proxyIP = proxyIP;
            const url = new URL(request.url);
            const upgradeHeader = request.headers.get('Upgrade');
            const match = listProxy.find(entry => url.pathname === entry.path);
            if (match) {
                proxyIP = match.proxy;
                if (upgradeHeader === 'websocket') {
                    return await vlessOverWSHandler(request);
                } else {
                    const vlessConfig = await getVLESSConfig(match.path, request.headers.get('Host'), match.proxy);
                    return new Response(vlessConfig, {
                        status: 200,
                        headers: {
                            "Content-Type": "text/html;charset=utf-8",
                        },
                    });
                }
            }
            return fetch(request);
        } catch (err) {
            return new Response(err.toString(), { status: 500 });
        }
    },
};

async function getVLESSConfig(path, hostName, proxyIP) {
    try {
        const response = await fetch(`https://ipwhois.app/json/${proxyIP}`);
        const data = await response.json();
        const isp = data.isp;
        const country = data.country;
        const city = data.city;
//        const proxyip = data.proxyStatus;
        const pathFixed = encodeURIComponent(path);
        const vlessTls = `vless://1a225732-bf40-4bdc-bc3a-1fcb6bdd5ddd@${hostName}:443?encryption=none&security=tls&sni=${hostName}&fp=randomized&type=ws&host=${hostName}&path=${pathFixed}#${isp}`;
        const vlessNtls = `vless://1a225732-bf40-4bdc-bc3a-1fcb6bdd5ddd@${hostName}:80?path=${pathFixed}&security=none&encryption=none&host=${hostName}&fp=randomized&type=ws&sni=${hostName}#${isp}`;
        const vlessTlsFixed = vlessTls.replace(/ /g, '+');
        const vlessNtlsFixed = vlessNtls.replace(/ /g, '+');
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akun Vless Gratis - Akun Vless Cloudflare</title>
    <meta name="description" content="Akun Vless Gratis.">
    <meta name="keywords" content="Anggavless, Vless Gratis, Free Vless, Vless CF, Trojan CF, Cloudflare">
    <meta name="author" content="Angga Alfarizi">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Meta Tags untuk SEO Media Sosial -->
    <meta property="og:title" content="Akun Vless Gratis - Akun Vless Cloudflare">
    <meta property="og:description" content="Anggavless, Vless Gratis, Free Vless, Vless CF, Trojan CF, Cloudflare.">
    <meta property="og:image" content="URL_TO_IMAGE"> <!-- Ganti dengan URL gambar yang sesuai -->
    <meta property="og:url" content="https://raw.githubusercontent.com/angga03k/papipu/main/img/gsmbar.img.jpg">
    <meta property="og:type" content="website">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Akun Vless Gratis - Akun Vless Cloudflare">
    <meta name="twitter:description" content="Anggavless, Vless Gratis, Free Vless, Vless CF, Trojan CF, Cloudflare.">
    <meta name="twitter:image" content="https://raw.githubusercontent.com/angga03k/papipu/main/img/gsmbar.img.jpg"> <!-- Ganti dengan URL gambar yang sesuai -->
    <link href="https://raw.githubusercontent.com/angga03k/papipu/main/img/img1.png" rel="icon" type="image/png">
    <title>VLESS CLOUDFLARE</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #121212;
            color: #ffffff;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative; /* Untuk positioning watermark */
        }
        .container {
            background-color: #1e1e1e;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
            padding: 30px;
            width: 100%;
            max-width: 600px;
            border: 1px solid #2c2c2c;
            position: relative; /* Untuk positioning watermark */
        }
        h2 {
            text-align: center;
            color: #ffa500;
            margin: 0;
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            background-color: #2b2b2b;
            border-radius: 8px;
            padding: 15px;
            color: #ffffff;
            margin-bottom: 20px;
            border: 1px solid #3c3c3c;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .button2 {
            background-color: #ffa500;
            border: none;
            color: #1e1e1e;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .button2:hover {
            background-color: #ff8c00;
            transform: scale(1.05);
        }
        .watermark {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5); /* Warna watermark dengan transparansi */
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Bayangan teks untuk keterbacaan */
            font-weight: bold;
            text-align: center; /* Pusatkan teks watermark */
        }
        .watermark a {
            color: #ffa500; /* Warna teks link */
            text-decoration: none; /* Menghapus garis bawah link */
            font-weight: bold; /* Menambahkan ketebalan pada teks */
        }
        .watermark a:hover {
            color: #ffa500; /* Warna link saat hover */
        }
        .user-id-wrapper {
            display: inline-block;
            max-width: 20ch; /* Menampilkan 15 karakter pada tampilan awal */
            overflow-x: auto; /* Mengaktifkan scrollbar horizontal jika diperlukan */
            white-space: nowrap; /* Mencegah teks membungkus ke baris berikutnya */
            background-color: transparent; /* Latar belakang transparan */
            border: none; /* Menghapus border */
            padding: 0; /* Menghapus padding */
            font-weight: bold; /* Menambahkan ketebalan pada teks */
        }
        .ordered-list {
            margin: 20px 0;
            padding-left: 20px;
            color: #ffa500;
        }
        .ordered-list li {
            margin-bottom: 5px;
        }
        .noted {
            margin-top: 10px;
            color: #ff4500;
            font-weight: bold;
            font-style: italic;
        }
                .noted1 {
            margin-top: 10px;
            color: #ffa500;
            font-weight: bold;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>VLESS ACCOUNT</h2>
        <pre><b>
» Domain      : ${hostName}
» ISP         : ${isp}
» Country     : ${country}
» City        : ${city}
» User ID     : <span class="user-id-wrapper">1a225732-bf40-4bdc-bc3a-1fcb6bdd5ddd</span>
» Port TLS    : 443
» Port NTLS   : 80
» Security    : auto
» Network     : (WS)
» Path        : ${path}        </b></pre>
        <pre><b>FORMAT TLS 443 : <button class="button2" onclick='copyToClipboard("${vlessNtlsFixed}")'><i class="fa fa-clipboard"></i> Copy TLS 443</button> 

${vlessTlsFixed}</b></pre>
        <pre><b>FORMAT NTLS 80  : <button class="button2" onclick='copyToClipboard("${vlessNtlsFixed}")'><i class="fa fa-clipboard"></i> Copy NTLS 80 </button>

${vlessNtlsFixed}</b></pre>

        <h3>DAFTAR BUG WILCARD</h3>
        <ul class="ordered-list">
            <li>Bug 1: graph.instagram.com</li>
            <li>Bug 2: investors.spotify.com</li>
            <li>Bug 3: cache.netflix.com</li>
            <li>Bug 4: www.pubgmobile.com</li>
            <li>Bug 5: dl.cvs.freefiremobile.com</li>
            <li>Bug 6: ava.game.naver.com</li>
            <li>Bug 7: support.zoom.us</li>
	    <li>Bug 8: beta.zoom.us</li>
            <li>Bug 9: quiz.int.vidio.com</li>
	    <li>Bug 10: support.zoom.us</li>
            <li>Bug 11: blog.webex.com</li>
            <li>Bug 12: acces.iflix.com</li>
            <li>Bug 13: zaintest.vuclip.com</li>
            <li>Bug 14: sb.scorecardresearch.com</li>
        </ul>
        <h3>Cara Penggunaan Wilcard</h3>
        <p class="noted1">Ganti domain pada akun VLESS dengan salah satu domain Bug Wilcard di atas, misalnya: graph.instagram.com.${hostName}</p>
                <h3>Cara Ganti Server atau ISP</h3>
        <p class="noted1">Ganti Path Contoh /id1 jika ingin ganti server maka ganti path jadi /id2. List Path ada dibawah.</p>
                <ul class="ordered-list">
            <li>Path 1: /id1</li>
            <li>Path 2: /id2</li>
            <li>Path 3: /id3</li>
            <li>Path 4: /sg1</li>
            <li>Path 5: /sg2</li>
            <li>Path 6: /sg3</li>
            <li>Path 7: /us1</li>
            <li>Path 8: /us2</li>
            <li>Path 9: /my1</li>
            <li>Path 10: /jp1</li>
        <p class="noted">Noted: Pastikan untuk memeriksa konfigurasi dengan teliti sebelum digunakan.</p>
        
        <div class="watermark">
            Develoved by <a href="https://t.me/anggaalfarizi" target="_blank">ME</a>
        </div>
    </div>
    <script>
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    alert("Copied to clipboard");
                })
                .catch((err) => {
                    console.error("Failed to copy to clipboard:", err);
                });
        }
    </script>
</body>
</html>
`;

    } catch (error) {
        return "Terjadi kesalahan saat membuat konfigurasi VLESS.";
    }
}

async function vlessOverWSHandler(request) {
	const webSocketPair = new WebSocketPair();
	const [client, webSocket] = Object.values(webSocketPair);

	webSocket.accept();

	let address = '';
	let portWithRandomLog = '';
	const log = (info, event) => {
		console.log(`[${address}:${portWithRandomLog}] ${info}`, event || '');
	};
	const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';

	const readableWebSocketStream = makeReadableWebSocketStream(webSocket, earlyDataHeader, log);

	let remoteSocketWapper = {
		value: null,
	};
	let udpStreamWrite = null;
	let isDns = false;

	readableWebSocketStream.pipeTo(new WritableStream({
		async write(chunk, controller) {
			if (isDns && udpStreamWrite) {
				return udpStreamWrite(chunk);
			}
			if (remoteSocketWapper.value) {
				const writer = remoteSocketWapper.value.writable.getWriter()
				await writer.write(chunk);
				writer.releaseLock();
				return;
			}

			const {
				hasError,
				message,
				portRemote = 443,
				addressRemote = '',
				rawDataIndex,
				vlessVersion = new Uint8Array([0, 0]),
				isUDP,
			} = processVlessHeader(chunk);
			address = addressRemote;
			portWithRandomLog = `${portRemote}--${Math.random()} ${isUDP ? 'udp ' : 'tcp '
				} `;
			if (hasError) {
				throw new Error(message); 
				return;
			}
			if (isUDP) {
				if (portRemote === 53) {
					isDns = true;
				} else {
					throw new Error('UDP proxy only enable for DNS which is port 53');
					return;
				}
			}
			const vlessResponseHeader = new Uint8Array([vlessVersion[0], 0]);
			const rawClientData = chunk.slice(rawDataIndex);

			if (isDns) {
				const { write } = await handleUDPOutBound(webSocket, vlessResponseHeader, log);
				udpStreamWrite = write;
				udpStreamWrite(rawClientData);
				return;
			}
			handleTCPOutBound(remoteSocketWapper, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log);
		},
		close() {
			log(`readableWebSocketStream is close`);
		},
		abort(reason) {
			log(`readableWebSocketStream is abort`, JSON.stringify(reason));
		},
	})).catch((err) => {
		log('readableWebSocketStream pipeTo error', err);
	});

	return new Response(null, {
		status: 101,
		webSocket: client,
	});
}

async function handleTCPOutBound(remoteSocket, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log,) {
	async function connectAndWrite(address, port) {
		const tcpSocket = connect({
			hostname: address,
			port: port,
		});
		remoteSocket.value = tcpSocket;
		log(`connected to ${address}:${port}`);
		const writer = tcpSocket.writable.getWriter();
		await writer.write(rawClientData);
		writer.releaseLock();
		return tcpSocket;
	}

	async function retry() {
		const tcpSocket = await connectAndWrite(proxyIP || addressRemote, portRemote)
		tcpSocket.closed.catch(error => {
			console.log('retry tcpSocket closed error', error);
		}).finally(() => {
			safeCloseWebSocket(webSocket);
		})
		remoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, null, log);
	}

	const tcpSocket = await connectAndWrite(addressRemote, portRemote);

	remoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, retry, log);
}

function makeReadableWebSocketStream(webSocketServer, earlyDataHeader, log) {
	let readableStreamCancel = false;
	const stream = new ReadableStream({
		start(controller) {
			webSocketServer.addEventListener('message', (event) => {
				if (readableStreamCancel) {
					return;
				}
				const message = event.data;
				controller.enqueue(message);
			});
			webSocketServer.addEventListener('close', () => {
				safeCloseWebSocket(webSocketServer);
				if (readableStreamCancel) {
					return;
				}
				controller.close();
			}
			);
			webSocketServer.addEventListener('error', (err) => {
				log('webSocketServer has error');
				controller.error(err);
			}
			);
			const { earlyData, error } = base64ToArrayBuffer(earlyDataHeader);
			if (error) {
				controller.error(error);
			} else if (earlyData) {
				controller.enqueue(earlyData);
			}
		},

		pull(controller) {
		},
		cancel(reason) {
			if (readableStreamCancel) {
				return;
			}
			log(`ReadableStream was canceled, due to ${reason}`)
			readableStreamCancel = true;
			safeCloseWebSocket(webSocketServer);
		}
	});

	return stream;

}
function processVlessHeader(
	vlessBuffer
) {
	if (vlessBuffer.byteLength < 24) {
		return {
			hasError: true,
			message: 'invalid data',
		};
	}
	const version = new Uint8Array(vlessBuffer.slice(0, 1));
	let isValidUser = true;
	let isUDP = false;
	if (!isValidUser) {
		return {
			hasError: true,
			message: 'invalid user',
		};
	}

	const optLength = new Uint8Array(vlessBuffer.slice(17, 18))[0];

	const command = new Uint8Array(
		vlessBuffer.slice(18 + optLength, 18 + optLength + 1)
	)[0];
	if (command === 1) {
	} else if (command === 2) {
		isUDP = true;
	} else {
		return {
			hasError: true,
			message: `command ${command} is not support, command 01-tcp,02-udp,03-mux`,
		};
	}
	const portIndex = 18 + optLength + 1;
	const portBuffer = vlessBuffer.slice(portIndex, portIndex + 2);
	const portRemote = new DataView(portBuffer).getUint16(0);

	let addressIndex = portIndex + 2;
	const addressBuffer = new Uint8Array(
		vlessBuffer.slice(addressIndex, addressIndex + 1)
	);

	const addressType = addressBuffer[0];
	let addressLength = 0;
	let addressValueIndex = addressIndex + 1;
	let addressValue = '';
	switch (addressType) {
		case 1:
			addressLength = 4;
			addressValue = new Uint8Array(
				vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			).join('.');
			break;
		case 2:
			addressLength = new Uint8Array(
				vlessBuffer.slice(addressValueIndex, addressValueIndex + 1)
			)[0];
			addressValueIndex += 1;
			addressValue = new TextDecoder().decode(
				vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			);
			break;
		case 3:
			addressLength = 16;
			const dataView = new DataView(
				vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
			);
			const ipv6 = [];
			for (let i = 0; i < 8; i++) {
				ipv6.push(dataView.getUint16(i * 2).toString(16));
			}
			addressValue = ipv6.join(':');
			break;
		default:
			return {
				hasError: true,
				message: `invild  addressType is ${addressType}`,
			};
	}
	if (!addressValue) {
		return {
			hasError: true,
			message: `addressValue is empty, addressType is ${addressType}`,
		};
	}

	return {
		hasError: false,
		addressRemote: addressValue,
		addressType,
		portRemote,
		rawDataIndex: addressValueIndex + addressLength,
		vlessVersion: version,
		isUDP,
	};
}

async function remoteSocketToWS(remoteSocket, webSocket, vlessResponseHeader, retry, log) {
	let remoteChunkCount = 0;
	let chunks = [];
	let vlessHeader = vlessResponseHeader;
	let hasIncomingData = false;
	await remoteSocket.readable
		.pipeTo(
			new WritableStream({
				start() {
				},
				async write(chunk, controller) {
					hasIncomingData = true;
					if (webSocket.readyState !== WS_READY_STATE_OPEN) {
						controller.error(
							'webSocket.readyState is not open, maybe close'
						);
					}
					if (vlessHeader) {
						webSocket.send(await new Blob([vlessHeader, chunk]).arrayBuffer());
						vlessHeader = null;
					} else {
						webSocket.send(chunk);
					}
				},
				close() {
					log(`remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`);
				},
				abort(reason) {
					console.error(`remoteConnection!.readable abort`, reason);
				},
			})
		)
		.catch((error) => {
			console.error(
				`remoteSocketToWS has exception `,
				error.stack || error
			);
			safeCloseWebSocket(webSocket);
		});
	if (hasIncomingData === false && retry) {
		log(`retry`)
		retry();
	}
}

function base64ToArrayBuffer(base64Str) {
	if (!base64Str) {
		return { error: null };
	}
	try {
		base64Str = base64Str.replace(/-/g, '+').replace(/_/g, '/');
		const decode = atob(base64Str);
		const arryBuffer = Uint8Array.from(decode, (c) => c.charCodeAt(0));
		return { earlyData: arryBuffer.buffer, error: null };
	} catch (error) {
		return { error };
	}
}


const WS_READY_STATE_OPEN = 1;
const WS_READY_STATE_CLOSING = 2;
function safeCloseWebSocket(socket) {
	try {
		if (socket.readyState === WS_READY_STATE_OPEN || socket.readyState === WS_READY_STATE_CLOSING) {
			socket.close();
		}
	} catch (error) {
		console.error('safeCloseWebSocket error', error);
	}
}

async function handleUDPOutBound(webSocket, vlessResponseHeader, log) {

	let isVlessHeaderSent = false;
	const transformStream = new TransformStream({
		start(controller) {

		},
		transform(chunk, controller) {
			for (let index = 0; index < chunk.byteLength;) {
				const lengthBuffer = chunk.slice(index, index + 2);
				const udpPakcetLength = new DataView(lengthBuffer).getUint16(0);
				const udpData = new Uint8Array(
					chunk.slice(index + 2, index + 2 + udpPakcetLength)
				);
				index = index + 2 + udpPakcetLength;
				controller.enqueue(udpData);
			}
		},
		flush(controller) {
		}
	});
	transformStream.readable.pipeTo(new WritableStream({
		async write(chunk) {
			const resp = await fetch('https://1.1.1.1/dns-query',
				{
					method: 'POST',
					headers: {
						'content-type': 'application/dns-message',
					},
					body: chunk,
				})
			const dnsQueryResult = await resp.arrayBuffer();
			const udpSize = dnsQueryResult.byteLength;
			const udpSizeBuffer = new Uint8Array([(udpSize >> 8) & 0xff, udpSize & 0xff]);
			if (webSocket.readyState === WS_READY_STATE_OPEN) {
				log(`doh success and dns message length is ${udpSize}`);
				if (isVlessHeaderSent) {
					webSocket.send(await new Blob([udpSizeBuffer, dnsQueryResult]).arrayBuffer());
				} else {
					webSocket.send(await new Blob([vlessResponseHeader, udpSizeBuffer, dnsQueryResult]).arrayBuffer());
					isVlessHeaderSent = true;
				}
			}
		}
	})).catch((error) => {
		log('dns udp has error' + error)
	});

	const writer = transformStream.writable.getWriter();

	return {
		write(chunk) {
			writer.write(chunk);
		}
	};
}

const core = require('../core');
const Channel = require('../lib/Channel');
const ChannelsManager = require('../lib/ChannelsManager');

async function start() {
	await core.init('test');
	const device = require('byteballcore/device');
	let wallets = await core.getMyDeviceWallets();
	let myDeviceAddress = device.getMyDeviceAddress();
	let channel;

	const channelsManager = new ChannelsManager(wallets[0]);

	let list = await channelsManager.list();
	// console.error('list', list);
	if (list.length) {
		channel = channelsManager.recoveryChannel(list[1]);
		channel.events.on('error', error => {
			console.error('channelError', channel.id, error);
		});
		channel.events.on('start', async () => {
			console.error('channel start. t.js', channel.id);
			// console.error('transfer', await channel.transfer(1000));
			// console.error('transfer', await channel.transfer(500));
			// console.error('close', await channel.mutualClosure());
			console.error('info', channel.info());
		});
		await channel.init();
		setTimeout(async () => {
			console.error('waitingMCI');
			await channel.waitingMCI('QEXHFtMOE0vh6XFtt22Is//rjq9CCYqWvB5ST49MxXI=');
		}, 10000);
		// console.error('transfer', await channel.transfer(1000));
		// console.error('transfer', await channel.transfer(500));
		// console.error('close', await channel.mutualClosure());
		console.error('info', channel.info());
		// console.error('channel', channel);
	} else {
		let channel = new Channel(wallets[0], myDeviceAddress, '0ER62QXE74WFU7ZVYFSJVJBLHVUPBO3Y4', null, 6000, 5000, 10);
		channel.events.on('error', error => {
			console.error('channelError', channel.id, error);
		});
		channel.events.on('start', async () => {
			console.error('channel start. t.js', channel.id);
			console.error('info', channel.info());
			// console.error('transfer', await channel.transfer(1000));
			// console.error('transfer', await channel.transfer(1005));
			// console.error('close', await channel.mutualClosure());
		});
		console.error('init', await channel.init());
		console.error('test', channel.info());
	}
}

start().catch(console.error)
import {Plugin} from 'obsidian';
import WakaTimeSettings from "./WakaTimeSettings";
import {Dependencies} from "./wakatime-cli/dependencies";
import {Options} from "./wakatime-cli/options"
import {Logger} from "./wakatime-cli/logger";
import {LogLevel} from "./wakatime-cli/constants";
import which from 'which';

interface WakaTimePluginSettings {
	apiKey: string;
}

const DEFAULT_SETTINGS: WakaTimePluginSettings = {
	apiKey: 'default'
}

export default class WakaTime extends Plugin {
	settings: WakaTimePluginSettings;
	dependencies: Dependencies;
	options: Options;
	logger: Logger;

	// TODO: wakatime events  https://wakatime.com/help/creating-plugin#handling-editor-events
	// - File Change - when the user switches to a new tab in their editor
	// - File Modified - should be triggered every time the currently focused file is changed
	// - File Saved - should trigger when file is written to disk
	// -------
	// https://wakatime.com/help/creating-plugin#debugging:confirming-heartbeat-received
	// https://wakatime.com/api/v1/users/current/user_agents // list of plugins and last heard from

	// TOOD: obsidian events
	// - quick-preview -
	// - click - active-leaf-change
	// - file-open -
	// - layout-change -

	async onload() {
		console.log('test', 'loading plugin');

		// TODO: What are the benefits of injecting options here?
		const options = new Options();
		// TODO: What are the benefits of injecting the logger here?
		const logger = new Logger(LogLevel.INFO);
		// TODO: Need to better understand how isGlobal is used
		const isGlobal = false;
		// TODO: store this in Obsidian Settings
		const newBetaCli = false
		// TODO: Get pluginPath from Obsidian
		const pluginPath = '~/Library/Mobile Documents/iCloud~md~obsidian/Documents/WardsWiki/.obsidian/plugins/obsidian-wakatime-local'
		this.dependencies = new Dependencies(
			options,
			logger,
			pluginPath,
			isGlobal,
			newBetaCli
		);
		await this.loadSettings();

		// TODO: set hours logged, or something1
		this.addStatusBarItem().setText('WakaTime');

		this.addSettingTab(new WakaTimeSettings(this.app, this));

		// TODO: Does codMirror provide any(better) helpful events
		// this.registerCodeMirror((cm: CodeMirror.Editor) => console.log('codemirror', cm));

		// TODO: use clickHook
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => console.log('test', 'click', evt));

		// TODO: use modifyHook
		// this.registerEvent(this.app.vault.on("modify", ()=> console.log('test','modify')));

		const fiveMinutes =5 * 60 * 1000;
		this.registerInterval(window.setInterval(() => {
			console.log('test', 'setInterval')
			// TODO: save on an interval, maybe?
		}, fiveMinutes));


		// initialize
		this.dependencies.checkAndInstall(() => {
			console.log('test','WakaTime initialized.')
			this.logger.debug('WakaTime initialized.');
			// this.statusBar.text = '$(clock)';
			// this.statusBar.tooltip = 'WakaTime: Initialized';
			// this.options.getSetting('settings', 'status_bar_enabled', (setting: Setting) => {
			// 	this.showStatusBar = setting.value !== 'false';
			// 	this.setStatusBarVisibility(this.showStatusBar);
			// });
			// this.options.getSetting('settings', 'status_bar_coding_activity', (setting: Setting) => {
			// 	if (setting.value == 'false') {
			// 		this.showCodingActivity = false;
			// 	} else {
			// 		this.showCodingActivity = true;
			// 		this.getCodingActivity();
			// 	}
			// });
		});
	}

	onunload() {
		console.log('test', 'unloading plugin');
		// TODO: cleanup wakatime things
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
}

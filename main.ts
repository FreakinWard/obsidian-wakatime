import { Plugin } from 'obsidian';
import WakaTimeSettings from "./src/WakaTimeSettings";
import useRequest from "./src/useRequest";
import useWakaTime from "./src/useWakaTime";

interface WakaTimePluginSettings {
	apiKey: string;
}

const DEFAULT_SETTINGS: WakaTimePluginSettings = {
	apiKey: 'default'
}

export default class WakaTime extends Plugin {
	settings: WakaTimePluginSettings;

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
		const {fileSelected} = useWakaTime();

		await this.loadSettings();

		// TODO: set hours logged, or something
		this.addStatusBarItem().setText('WakaTime');

		this.addSettingTab(new WakaTimeSettings(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', async (evt: MouseEvent) => {
			console.log('test', 'click', evt);
			// TODO: use clickHook
			await fileSelected();
		});

		this.registerEvent(this.app.vault.on("modify", ()=>{
			console.log('test','modify')
			// TODO: use modifyHook
		}));

		const fiveMinutes =5 * 60 * 1000;
		this.registerInterval(window.setInterval(() => {
			console.log('test', 'setInterval')
			// TODO: save on an interval, maybe?
		}, fiveMinutes));
	}

	onunload() {
		console.log('test', 'unloading plugin');
		// TODO: cleanup wakatime things
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async doYoThing() {
		const {apiFetch} = useRequest();
		const url = 'https://random-data-api.com/api/users/random_user'
		const result = await apiFetch(url);

		console.log('test', {result})

		await this.loadData()
	}
}
// :tada:

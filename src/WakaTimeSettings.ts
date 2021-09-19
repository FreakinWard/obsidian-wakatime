import {App, PluginSettingTab, Setting} from "obsidian";
import WakaTime from "../main";

export default class WakaTimeSettings extends PluginSettingTab {
    plugin: WakaTime;

    constructor(app: App, plugin: WakaTime) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let {containerEl: e} = this;

        e.empty();

        e.createEl('h2', {text: 'WakaTime Settings'});

        const apiKeySetting = new Setting(e)
            .setName('WakaTime API key')
            .addText(text => text
                .setValue(this.plugin.settings.apiKey)
                .setPlaceholder('api-key')
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.saveSettings();
                }));

        apiKeySetting.descEl.createEl('a', {text: 'my api-key', href:"https://wakatime.com/api-key"});
    }

    async saveSettings() {
        await this.plugin.saveData(this.plugin.settings);
        console.log('test, settings', this.plugin.settings)
    }
}

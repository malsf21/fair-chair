import { Component } from '@angular/core';

@Component({
  selector: 'page-settings',
  template: `
  <hr /> Developed by <a href="https://github.com/malsf21">Matthew Wang</a> for use at <a href="https://omun.ca">Ontario Model United Nations</a>
  <br />
  Running node
  <script>
    document.write(process.versions.node)
  </script>, Chrome
  <script>
    document.write(process.versions.chrome)
  </script>, and Electron
  <script>
    document.write(process.versions.electron)
  </script>.
  `
})

export class SettingsPageComponent { }

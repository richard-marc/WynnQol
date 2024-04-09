# WynnQol

## Usage
Requires JSMacros 1.9.1 BETA (or higher). Crashes with 1.9.0
Full artifact:
https://github.com/JsMacros/JsMacros/actions/runs/8370057228

1. Once JSMacros is installed, open the menu by using the hotkey.
2. Open File Explorer and go to ./minecraft/config/jsMacros/Macros and put the WynnQol folder in there
3. WynnQol has 3 folders that align with the three buttons in the JSMacros menu, Keys, Events, and Services. Currently, I have only made services. 
4. Click on Services, then the + button. Name the service whatever you wish.
5. Then under the File button, click the ./ and navigate to the services folder, and add whichever macro you want to add.
6. Then, click Enable and the Stopped button to get it running. 

## Features
<details>
<summary>antiBlindness</summary>
<br>
  Meant for TNA Berry
</details>
<details>
<summary>singleSpells</summary>
<br>
  Replacement for Wynntils spell macros. 
  <br>
  Much faster than Wynntil macros
  <br>
  Blocks Left and Right click during spell execution so you don't accidentally cast the wrong spell
  <br>
  Keys are binded as default wynntils spells, no way to rebind atm (other than manually changing the code)
  <br>
  You NEED the spellMacro to be enabled if you want to use /spellmacrodelay for this (i did not make a command handler it's just in spellMacro for now, i'll fix later)
</details>
<details>
<summary>spellMacro</summary>
<br>
  spell macro supports an "infinite" number of spells
  <br>
  the keybind & spell sequence & delay save so you don't have to do it again when you relaunch the game
  <br>
  blocks attacks and interacts during macro execution so you dont accidentally fuck spells up
  <br>
  <br>
  /spellmacro [spells] ex: rrr rrr rlr rll
  <br>
  /spellmacrokeybind [key] ex: /spellmacrokeybind n
  <br>
  /spellmacrodelay [delay] ex: /spellmacrodelay 100
</details>
<details>
<summary>voidHoleAlert</summary>
<br>
  TNA qol, alerts when a void hole spawns. also renders a beacon on its location.
</details>

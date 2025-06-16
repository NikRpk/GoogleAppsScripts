# GoogleScripts

This is just a collection of mini scripts and tools that you can use in your own projects. 

General scripts and an introduction to Google Apps Scripts can be found in the wiki section of this [repository](https://github.com/NikRpk/GoogleAppsScripts/wiki). 

## Tools

Complete tools and addons can be found each folder in this repository. I try to keep them up to date as far as possible. Feel free to copy them and adapt them to be more efficient or add additional functions. Please let me know as I am always interested in seeing how these can be improved and augemented. 

## Design standards
**Sheet setup**
- Control: always establish one sheet as the control sheet where the user can:
	- Set settings
 	- Read instructions on the sheet
  - Trigger scripts via buttons
  - See past error messages
  - Links to external resources (other sheets, places information is imported from, etc.)
  - Contact person in case of errors (can also be a help button)
- _dropdowns
	- As a source for all dynamic dropdowns used in the sheet
 	- One column for each dropdown so it can be automatically extended

**Button:** Runs a script
- Dimensions: 55mm wide, 15mm high
- Colour: background white
- Shape: rounded rectangle
- Border:
	- Thickness: 3px
	- Colour: #b7b7b7
- Icon:
	- Shape: square
	- Size: 10mm
	- Location: start 2.5mm width
- Text box:
	- Size: width (start 15mm, end 55mm), height 15mm
 	- Font size: 10
 	- Font family: Arial
  	- Alignment: Vertically center text	
 
***Sample Size***

<img width="217" alt="image" src="https://github.com/user-attachments/assets/66845bb2-8b0c-488d-8a37-82d4a9863bd4" />

***Example***

<img width="441" alt="image" src="https://github.com/user-attachments/assets/97cb9263-30e3-4434-84bf-1160c962e8e9" />






## Old Design Guidelines
**Main Button:** Runs the main script
- Dimensions: 4.5cm wide and 1.5cm long
- Colour: #009646 with white lines.
- Text: 12px, bold and white

![image](https://github.com/user-attachments/assets/29888115-3dc7-425c-9dcd-a778d67bc45a)

**Secondary Button:** Runs a secondary script
- Dimensions: 4.5cm wide and 1.5cm long
- Colour: #00a0e6 with white lines.
- Text: 12px, bold and white

![image](https://github.com/user-attachments/assets/fdc13b52-4291-4ebe-913e-97c1115ccf3f)


**Help Button:** Open a link to a Slack channel. 
- Dimensions: 3.0cm wide and 1.5cm long.
- Colour: #f1c232ff with black lines.
- Text: 12px, bold and black

![image](https://github.com/user-attachments/assets/5c06aef7-6c8a-4c69-8c7f-319fc6399812)


// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: magic;
// These must be at the very top of the file. Do not edit.
// Variables used by Scriptable.


// Widget Params, default values for debugging
const widgetParams = JSON.parse((args.widgetParameter != null) ? args.widgetParameter : '{"UserName" : "For Nana" , "BirthDay" : "09/27/1987"}')



const widgetHeight = 400
const widgetWidth = 400
const widgetColor="243D52"

const yellowColor=new Color("FFFF00",1)
const greenColor=new Color("00FF00",1)

// TitleName
let TitleName ="BioRithme Curves"
const titleFontSize = 20
const titleFont = Font.systemFont(titleFontSize)
const titlePos = new Point(25, 20)


//Get UserName and BritDays from the Widget Parameter
let UserName = widgetParams.UserName
let BirthDay = widgetParams.BirthDay
const UserColor = new Color("#33cc33", 1)



if (config.runsInApp) {// 
// if (UserName=="Request"){
 let note = "mm/dd/yyyy"
  BirthDay = await editData(note)
  UserName = "Special Request "
//  }

  Script.complete()
}



// Used Fonts and WidgetLocation
const UserNameFontSize = 18
const UserNameFont = Font.semiboldSystemFont(UserNameFontSize)
let UserNameCoords = new Point(25, 45)

const YFontSize = 8
const YFont = Font.systemFont(YFontSize)
const YColor = Color.white()
let YCoords = new Point(ScaleH*s-25, 230)

//=======================================
// DateConstructions
const date1 = new Date(BirthDay)
var day = date1.getDate()
var month = date1.getMonth() + 1
var year = date1.getFullYear()
var BirthDate = day + "-" + month + "-" + year 

var days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var weekday = days[date1.getDay()]

const cd = new Date() //cd=CurrentDate
if (cd.getMonth()+1==13){Month=1}else{Month=cd.getMonth()+1}
let Day = cd.getDate()
let Str_Today= Month+"/"+Day+"/"+cd.getFullYear()
let SubT_Today= Day+"/"+Month+"/"+cd.getFullYear()
const date2 = new Date(Str_Today)
let DaysDiff= getDifferenceInDays(date1, date2)

//=======================================
//Drawing Line
DrawContext.prototype.drawLine = function (p_x1, p_y1, p_x2, p_y2, p_colourLine, p_intWidth)
{	
	let pthLine = new Path();
	pthLine.move(new Point(p_x1, p_y1));
	pthLine.addLine(new Point(p_x2, p_y2));
	this.addPath(pthLine);
	this.setStrokeColor(p_colourLine);	
	this.setLineWidth(p_intWidth);
	this.strokePath();
}

//=======================================
// Set-up a small widget and drawing region
let wgtMain = new ListWidget();
wgtMain.setPadding(0, 0, 0, 0);
wgtMain.backgroundColor = new Color(widgetColor)

let dcRegion = new DrawContext();
dcRegion.size = new Size(widgetWidth, widgetHeight)
dcRegion.opaque = false

// Widget Title
drawTextP(TitleName , titlePos, Color.white(), titleFont)

// User Name
dcRegion.setTextAlignedLeft()
UserName=UserName + " " + DaysDiff + " Days Old "
drawTextP(capitalize(UserName), UserNameCoords, greenColor, UserNameFont)

UserNameCoords = new Point(25, 65)
let SubTitle="Status from " + SubT_Today + " till end Cycle."
drawTextP(SubTitle, UserNameCoords, Color.white(), UserNameFont)
//=======================================
// BirtDay Info
InfoCoords = new Point(25, 310)
drawTextP("BirthDate: "+ weekday + " " +BirthDate, InfoCoords, Color.white(), UserNameFont)

//=======================================
// BioFigures
let f=DaysDiff/23-Math.floor(DaysDiff/23)
InfoCoords = new Point(25, 330)
drawTextP("Fys - 23D: ("+ f.toFixed(4)+ ") "+ await BioInfo(f), InfoCoords, Color.red(), UserNameFont)

let e=DaysDiff/28-Math.floor(DaysDiff/28)
InfoCoords = new Point(25, 350)
drawTextP("Emo - 28D: ("+ e.toFixed(4)+ ")"+ await BioInfo(e), InfoCoords, greenColor, UserNameFont)

let i=DaysDiff/33-Math.floor(DaysDiff/33)
InfoCoords = new Point(25, 370)
drawTextP("Int - 33D: ("+ i.toFixed(4)+ ")"+ await BioInfo(i) , InfoCoords, yellowColor, UserNameFont)
//=======================================

//Draw X/Y Axes
dcRegion.drawLine(20, widgetWidth/2, 390, widgetWidth/2, Color.gray(), 2) //Hor
 
// dcRegion.drawLine(widgetWidth/2, 100, widgetWidth/2, 300, Color.gray(), 2) //Ver

var ScaleH=380 //widgetWidth 
var ScaleV=widgetHeight/4 //100
var BseL=widgetHeight/2 //200 BaseLine (X-Axe) the half of the CanvasHeight
var x0,x1,y1,x2,y2,s

//=======================================
for (x0=1;x0<(ScaleH+1);x0++){	

//=======================================
//Fys (23 Days)
//Calculate Rest of a Cycle
f=DaysDiff/23-Math.floor(DaysDiff/23)
//Set x1 & x2
await Set_x1x2()
await CalculateCoordinates(f,23)
await BioBase(23)

//Draw Sinus Wave
dcRegion.drawLine(x1+20, y1, x2+20, y2,Color.red(), 3)

//Draw Vertical each Quarter
//if (x1==ScaleH*s/4){
//dcRegion.drawLine(x1,BseL,x1,y1,Color.red(), 3)

//=======================================
//Emo (28 Days)
e=DaysDiff/28-Math.floor(DaysDiff/28)
await Set_x1x2()
await CalculateCoordinates(e,28)
await BioBase(28) 

//Draw Sinus Wave
dcRegion.drawLine(x1+20, y1, x2+20, y2,greenColor, 3)

//=======================================
//Intel (33 Days)
i=DaysDiff/33-Math.floor(DaysDiff/33)
await Set_x1x2()
await CalculateCoordinates(i,33)
await BioBase(33) 

//Draw Sinus Wave
dcRegion.drawLine(x1+20, y1, x2+20, y2,yellowColor, 3)
	
}

//======================================= 
//Adding Calendar Grid
//Today
UserNameCoords = new Point(21, 205)
drawTextP(Day , UserNameCoords, Color.cyan(), YFont)

for (x0=0;x0<(ScaleH/10);x0++){
	x1=x0*10
	y1=100
	x2=x0*10
	y2=300

let nextDate = new Date()
nextDate.setDate(cd.getDate() + x0)
Day=nextDate.getDate()
let CalColor=Color.white()
//Mark the Beginning of the Month
if (Day<3){CalColor=Color.cyan()}

//Shift Grid : For Small or Big Presenetantion
dcRegion.drawLine(x1+20,y1,x2+20,y2,CalColor, 1)

if ((x0/2-Math.floor(x0/2))==0){
YCoords = new Point(x1+21, 205)
drawTextP(Day , YCoords, CalColor, YFont)
}

}

//=======================================
// Render the widget with the lines on it
// 
wgtMain.backgroundImage = dcRegion.getImage()

if (!config.runsInWidget) await wgtMain.presentLarge()//.presentSmall();
Script.setWidget(wgtMain);
Script.complete();

//=======================================

// Returns the number of days between now and the provided date.
function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}

function drawTextP(text, point, color, font) {
  dcRegion.setFont(font)
  dcRegion.setTextColor(color)
  dcRegion.drawText(new String(text).toString(), point)
}

function drawTextR(text, rect, color, font) {
  dcRegion.setFont(font)
  dcRegion.setTextColor(color)
  dcRegion.drawTextInRect(new String(text).toString(), rect)
}

function capitalize(string) {
//UpperCase function
  return string.replace(/\b\w/g, l=>l.toUpperCase())
}

function Set_x1x2() {
//Sets the X-Point
x1=x0-1
x2=x0	
}

function BioBase(Bse) {
//Calculates the Horizontal scale based upon 400Points=35Days
s=Bse/35 //23,28,33 Days 
x1=x1*s
x2=x2*s	
}

function CalculateCoordinates(r,d){
//Calculation of the X/Y Coordinates
//Reverse the coordinate (-x), because the 0,0 coordinate is not Left-Under,but Left-Up
x1=x2-1
y1=Math.sin(-(x1/ScaleH+r)*2*Math.PI)*ScaleV + BseL 
y2=Math.sin(-(x2/ScaleH+r)*2*Math.PI)*ScaleV + BseL 
}

function BioInfo(y){
//Calculates the Progress for the next Days
const BioStat=Math.sin(y*2*Math.PI).toFixed(3)
let Info="Going Up :)"
if (y>=0.25&&y<=0.75){Info="Going Down :("}
Info = BioStat + " " + Info
return Info
}


async function editData(data) {
  let editor = new Alert()
  editor.title = "BioRithme RequestDate"
  editor.addTextField(data)
  editor.addCancelAction("Cancel")
  editor.addAction("Save")
  let action = await editor.present()
  if (action < 0) {
    return data
  } else {
    return editor.textFieldValue(0)
  }
}

/*
 * (c) Copyright Ascensio System SIA 2010-2023
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
 (function(window,undefined){function CBinaryReader(data,start,size){this.data=data;this.pos=start;this.limit=start+size}CBinaryReader.prototype.readByte=function(){var val=this.data[this.pos];this.pos+=1;return val};CBinaryReader.prototype.readInt=function(){var val=this.data[this.pos]|this.data[this.pos+1]<<8|this.data[this.pos+2]<<16|this.data[this.pos+3]<<24;this.pos+=4;return val};CBinaryReader.prototype.readDouble=function(){return this.readInt()/100};CBinaryReader.prototype.readDouble2=function(){return this.readInt()/
1E4};CBinaryReader.prototype.readString=function(){var len=this.readInt();var val=String.prototype.fromUtf8(this.data,this.pos,len);this.pos+=len;return val};CBinaryReader.prototype.readData=function(){var len=this.readInt();var val=this.data.slice(this.pos,this.pos+len);this.pos+=len;return val};CBinaryReader.prototype.isValid=function(){return this.pos<this.limit?true:false};CBinaryReader.prototype.Skip=function(nPos){this.pos+=nPos};function CBinaryWriter(){this.size=1E5;this.dataSize=0;this.buffer=
new Uint8Array(this.size)}CBinaryWriter.prototype.checkAlloc=function(addition){if(this.dataSize+addition<=this.size)return;var newSize=Math.max(this.size*2,this.size+addition);var newBuffer=new Uint8Array(newSize);newBuffer.set(this.buffer,0);this.size=newSize;this.buffer=newBuffer};CBinaryWriter.prototype.writeUint=function(value){this.checkAlloc(4);var val=value>2147483647?value-4294967296:value;this.buffer[this.dataSize++]=val&255;this.buffer[this.dataSize++]=val>>>8&255;this.buffer[this.dataSize++]=
val>>>16&255;this.buffer[this.dataSize++]=val>>>24&255};CBinaryWriter.prototype.writeString=function(value){var valueUtf8=value.toUtf8();this.checkAlloc(valueUtf8.length);this.buffer.set(valueUtf8,this.dataSize);this.dataSize+=valueUtf8.length};var UpdateFontsSource={Undefined:0,Page:1,Annotation:2,Forms:4};function CFile(){this.nativeFile=0;this.stream=-1;this.stream_size=0;this.type=-1;this.pages=[];this.info=null;this._isNeedPassword=false;this.fontPageIndex=-1;this.fontPageUpdateType=UpdateFontsSource.Undefined;
this.fontStreams={};this.scannedImages={}}(function(){if(undefined!==String.prototype.fromUtf8&&undefined!==String.prototype.toUtf8)return;var STRING_UTF8_BUFFER_LENGTH=1024;var STRING_UTF8_BUFFER=new ArrayBuffer(STRING_UTF8_BUFFER_LENGTH);String.prototype.fromUtf8=function(buffer,start,len){if(undefined===start)start=0;if(undefined===len)len=buffer.length-start;var result="";var index=start;var end=start+len;while(index<end){var u0=buffer[index++];if(!(u0&128)){result+=String.fromCharCode(u0);continue}var u1=
buffer[index++]&63;if((u0&224)==192){result+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=buffer[index++]&63;if((u0&240)==224)u0=(u0&15)<<12|u1<<6|u2;else u0=(u0&7)<<18|u1<<12|u2<<6|buffer[index++]&63;if(u0<65536)result+=String.fromCharCode(u0);else{var ch=u0-65536;result+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return result};String.prototype.toUtf8=function(isNoEndNull,isUseBuffer){var inputLen=this.length;var testLen=6*inputLen+1;var tmpStrings=isUseBuffer&&testLen<STRING_UTF8_BUFFER_LENGTH?
STRING_UTF8_BUFFER:new ArrayBuffer(testLen);var code=0;var index=0;var outputIndex=0;var outputDataTmp=new Uint8Array(tmpStrings);var outputData=outputDataTmp;while(index<inputLen){code=this.charCodeAt(index++);if(code>=55296&&code<=57343&&index<inputLen)code=65536+((code&1023)<<10|1023&this.charCodeAt(index++));if(code<128)outputData[outputIndex++]=code;else if(code<2048){outputData[outputIndex++]=192|code>>6;outputData[outputIndex++]=128|code&63}else if(code<65536){outputData[outputIndex++]=224|
code>>12;outputData[outputIndex++]=128|code>>6&63;outputData[outputIndex++]=128|code&63}else if(code<2097151){outputData[outputIndex++]=240|code>>18;outputData[outputIndex++]=128|code>>12&63;outputData[outputIndex++]=128|code>>6&63;outputData[outputIndex++]=128|code&63}else if(code<67108863){outputData[outputIndex++]=248|code>>24;outputData[outputIndex++]=128|code>>18&63;outputData[outputIndex++]=128|code>>12&63;outputData[outputIndex++]=128|code>>6&63;outputData[outputIndex++]=128|code&63}else if(code<
2147483647){outputData[outputIndex++]=252|code>>30;outputData[outputIndex++]=128|code>>24&63;outputData[outputIndex++]=128|code>>18&63;outputData[outputIndex++]=128|code>>12&63;outputData[outputIndex++]=128|code>>6&63;outputData[outputIndex++]=128|code&63}}if(isNoEndNull!==true)outputData[outputIndex++]=0;return new Uint8Array(tmpStrings,0,outputIndex)};function StringPointer(pointer,len){this.ptr=pointer;this.length=len}StringPointer.prototype.free=function(){if(0!==this.ptr)Module["_free"](this.ptr)};
String.prototype.toUtf8Pointer=function(isNoEndNull){var tmp=this.toUtf8(isNoEndNull,true);var pointer=Module["_malloc"](tmp.length);if(0==pointer)return null;Module["HEAP8"].set(tmp,pointer);return new StringPointer(pointer,tmp.length)}})();function CNativePointer(){this.ptr=null}CNativePointer.prototype.free=function(){if(this.ptr)g_native_drawing_file["FreeWasmData"](this.ptr);this.ptr=null};CNativePointer.prototype.getReader=function(){if(!this.ptr)return null;return new CBinaryReader(this.ptr,
0,this.ptr.length)};var g_module_pointer=new CNativePointer;CFile.prototype._free=function(ptr){};CFile.prototype._getUint8Array=function(ptr,len){};CFile.prototype._getUint8ClampedArray=function(ptr,len){};CFile.prototype._openFile=function(buffer,password){var res=false;if(!buffer)res=-1!==g_native_drawing_file["GetType"]();if(res)this.nativeFile=1;return res};CFile.prototype._closeFile=function(){g_native_drawing_file["CloseFile"]();this.nativeFile=0};CFile.prototype._getType=function(){return g_native_drawing_file["GetType"]()};
CFile.prototype._getError=function(){return g_native_drawing_file["GetErrorCode"]()};CFile.prototype._isNeedCMap=function(){return g_native_drawing_file["IsNeedCMap"]()};CFile.prototype._setCMap=function(memoryBuffer){};CFile.prototype._getFontByID=function(ID){return g_native_drawing_file["GetFontBinary"](ID)};CFile.prototype._getInteractiveFormsFonts=function(type){g_module_pointer.ptr=g_native_drawing_file["GetInteractiveFormsFonts"](type);return g_module_pointer};CFile.prototype._getInfo=function(){g_module_pointer.ptr=
g_native_drawing_file["GetInfo"]();return g_module_pointer};CFile.prototype._getStructure=function(){g_module_pointer.ptr=g_native_drawing_file["GetStructure"]();return g_module_pointer};CFile.prototype._getLinks=function(pageIndex){g_module_pointer.ptr=g_native_drawing_file["GetLinks"](pageIndex);return g_module_pointer};CFile.prototype._getInteractiveFormsInfo=function(){g_module_pointer.ptr=g_native_drawing_file["GetInteractiveFormsInfo"]();return g_module_pointer};CFile.prototype._getAnnotationsInfo=
function(pageIndex){g_module_pointer.ptr=g_native_drawing_file["GetAnnotationsInfo"](pageIndex);return g_module_pointer};CFile.prototype._getButtonIcons=function(backgroundColor,pageIndex,isBase64,nWidget,nView){g_module_pointer.ptr=g_native_drawing_file["GetButtonIcons"](backgroundColor===undefined?16777215:backgroundColor,pageIndex,isBase64?1:0,nWidget===undefined?-1:nWidget,nView);return g_module_pointer};CFile.prototype._getAnnotationsAP=function(width,height,backgroundColor,pageIndex,nAnnot,
nView){g_module_pointer.ptr=g_native_drawing_file["GetAnnotationsAP"](width,height,backgroundColor===undefined?16777215:backgroundColor,pageIndex,nAnnot===undefined?-1:nAnnot,nView);return g_module_pointer};CFile.prototype._getInteractiveFormsAP=function(width,height,backgroundColor,pageIndex,nWidget,nView,nButtonView){g_module_pointer.ptr=g_native_drawing_file["GetInteractiveFormsAP"](width,height,backgroundColor===undefined?16777215:backgroundColor,pageIndex,nWidget===undefined?-1:nWidget,nView,
nButtonView);return g_module_pointer};CFile.prototype._scanPage=function(page,mode){g_module_pointer.ptr=g_native_drawing_file["ScanPage"](page,mode===undefined?0:mode);return g_module_pointer};CFile.prototype._getImageBase64=function(rId){return g_native_drawing_file["GetImageBase64"](rId)};CFile.prototype._getGlyphs=function(pageIndex){var res={};res.info=[0,0,0,0];res.result=[];return res};CFile.prototype._destroyTextInfo=function(){g_native_drawing_file["DestroyTextInfo"](rId)};CFile.prototype._getPixmap=
function(pageIndex,width,height,backgroundColor){return null};CFile.prototype._InitializeFonts=function(basePath){};CFile.prototype._CheckStreamId=function(data,status){};CFile.prototype.lockPageNumForFontsLoader=function(pageIndex,type){this.fontPageIndex=pageIndex;this.fontPageUpdateType=type};CFile.prototype.unlockPageNumForFontsLoader=function(){this.fontPageIndex=-1;drawingFile.fontPageUpdateType=UpdateFontsSource.Undefined};CFile.prototype.getOriginPage=function(originIndex){for(var i=0;i<this.pages.length;++i)if(this.pages[i]["originIndex"]==
originIndex)return [i,this.pages[i]];return [null,null]};CFile.prototype["getPages"]=function(){return this.pages};CFile.prototype["openForms"]=function(){};CFile.prototype["getDocumentInfo"]=function(){return this.info};CFile.prototype["getStartID"]=function(){return this.StartID};CFile.prototype["loadFromData"]=function(arrayBuffer){var isSuccess=this._openFile(arrayBuffer);var error=this._getError();this.type=this._getType();self.drawingFile=this;if(!error)this.getInfo();this._isNeedPassword=4===error?true:
false;return error};CFile.prototype["loadFromDataWithPassword"]=function(password){if(0!=this.nativeFile)this._closeFile();var isSuccess=this._openFile(undefined,password);var error=this._getError();this.type=this._getType();self.drawingFile=this;if(!error)this.getInfo();this._isNeedPassword=4===error?true:false;return error};CFile.prototype["close"]=function(){this._closeFile();this.nativeFile=0;this.pages=[];this.info=null;this.StartID=null;if(this.stream>0)this._free(this.stream);this.stream=-1;
self.drawingFile=null};CFile.prototype["getFileBinary"]=function(){if(0>=this.stream)return"";return new Uint8Array(Module["HEAP8"].buffer,this.stream,this.stream_size)};CFile.prototype["isNeedPassword"]=function(){return this._isNeedPassword};CFile.prototype.getInfo=function(){if(!this.nativeFile)return false;var ptr=this._getInfo();var reader=ptr.getReader();if(!reader)return false;this.StartID=reader.readInt();var _pages=reader.readInt();for(var i=0;i<_pages;i++){var rec={};rec["W"]=reader.readInt();
rec["H"]=reader.readInt();rec["Dpi"]=reader.readInt();rec["Rotate"]=reader.readInt();rec["originIndex"]=i;rec.fonts=[];rec.fontsUpdateType=UpdateFontsSource.Undefined;rec.text=null;this.pages.push(rec)}var json_info=reader.readString();try{this.info=JSON.parse(json_info)}catch(err){}ptr.free();return this.pages.length>0};CFile.prototype["getStructure"]=function(){var ptr=this._getStructure();var reader=ptr.getReader();if(!reader)return[];var res=[];while(reader.isValid()){var rec={};rec["page"]=reader.readInt();
rec["level"]=reader.readInt();rec["y"]=reader.readDouble();rec["description"]=reader.readString();res.push(rec)}ptr.free();return res};CFile.prototype["getLinks"]=function(pageIndex){var ptr=this._getLinks(pageIndex);var reader=ptr.getReader();if(!reader)return[];var res=[];while(reader.isValid()){var rec={};rec["link"]=reader.readString();rec["dest"]=reader.readDouble();rec["x"]=reader.readDouble();rec["y"]=reader.readDouble();rec["w"]=reader.readDouble();rec["h"]=reader.readDouble();res.push(rec)}ptr.free();
return res};CFile.prototype["getGlyphs"]=function(pageIndex){var [i,page]=this.getOriginPage(pageIndex);if(!page||page.fonts.length>0)return null;this.lockPageNumForFontsLoader(i,UpdateFontsSource.Page);var res=this._getGlyphs(pageIndex);this.unlockPageNumForFontsLoader();if(page.fonts.length>0){res=null;return null}if(res&&this.onUpdateStatistics)this.onUpdateStatistics(res.info[0],res.info[1],res.info[2],res.info[3]);return res.result||null};CFile.prototype["destroyTextInfo"]=function(){this._destroyTextInfo()};
CFile.prototype.getWidgetFonts=function(type){var ptr=this._getInteractiveFormsFonts(type);var reader=ptr.getReader();if(!reader)return[];var res=[];while(reader.isValid()){var n=reader.readInt();for(var i=0;i<n;++i)res.push(reader.readString())}ptr.free();return res};CFile.prototype["getInteractiveFormsEmbeddedFonts"]=function(){return this.getWidgetFonts(1)};CFile.prototype["getInteractiveFormsStandardFonts"]=function(){return this.getWidgetFonts(2)};CFile.prototype["getFontByID"]=function(ID){return this._getFontByID(ID)};
CFile.prototype["setCMap"]=function(memoryBuffer){if(!this.nativeFile)return;this._setCMap(memoryBuffer)};CFile.prototype["isNeedCMap"]=function(){return this._isNeedCMap()};function readAction(reader,rec){var SType=reader.readByte();rec["S"]=SType;if(SType==14)rec["JS"]=reader.readString();else if(SType==1){rec["page"]=reader.readInt();rec["kind"]=reader.readByte();switch(rec["kind"]){case 0:case 2:case 3:case 6:case 7:{var nFlag=reader.readByte();if(nFlag&1<<0)rec["left"]=reader.readDouble();if(nFlag&
1<<1)rec["top"]=reader.readDouble();if(nFlag&1<<2)rec["zoom"]=reader.readDouble();break}case 4:{rec["left"]=reader.readDouble();rec["bottom"]=reader.readDouble();rec["right"]=reader.readDouble();rec["top"]=reader.readDouble();break}case 1:case 5:default:break}}else if(SType==10)rec["N"]=reader.readString();else if(SType==6)rec["URI"]=reader.readString();else if(SType==9){rec["H"]=reader.readByte();var m=reader.readInt();rec["T"]=[];for(var j=0;j<m;++j)rec["T"].push(reader.readString())}else if(SType==
12){rec["Flags"]=reader.readInt();var m$0=reader.readInt();rec["Fields"]=[];for(var j$1=0;j$1<m$0;++j$1)rec["Fields"].push(reader.readString())}var NextAction=reader.readByte();if(NextAction){rec["Next"]={};readAction(reader,rec["Next"])}}function readAnnot(reader,rec){rec["AP"]={};rec["AP"]["i"]=reader.readInt();rec["annotflag"]=reader.readInt();var bHidden=rec["annotflag"]>>1&1;var bPrint=rec["annotflag"]>>2&1;rec["noZoom"]=rec["annotflag"]>>3&1;rec["noRotate"]=rec["annotflag"]>>4&1;var bNoView=
rec["annotflag"]>>5&1;rec["locked"]=rec["annotflag"]>>7&1;rec["ToggleNoView"]=rec["annotflag"]>>8&1;rec["lockedC"]=rec["annotflag"]>>9&1;rec["display"]=0;if(bHidden)rec["display"]=1;else if(bPrint)if(bNoView)rec["display"]=3;else rec["display"]=0;else if(bNoView)rec["display"]=0;else rec["display"]=2;rec["page"]=reader.readInt();rec["rect"]={};rec["rect"]["x1"]=reader.readDouble2();rec["rect"]["y1"]=reader.readDouble2();rec["rect"]["x2"]=reader.readDouble2();rec["rect"]["y2"]=reader.readDouble2();
var flags=reader.readInt();if(flags&1<<0)rec["UniqueName"]=reader.readString();if(flags&1<<1)rec["Contents"]=reader.readString();if(flags&1<<2){rec["BE"]={};rec["BE"]["S"]=reader.readByte();rec["BE"]["I"]=reader.readDouble()}if(flags&1<<3){var n=reader.readInt();rec["C"]=[];for(var i=0;i<n;++i)rec["C"].push(reader.readDouble2())}if(flags&1<<4){rec["border"]=reader.readByte();rec["borderWidth"]=reader.readDouble();if(rec["border"]==2){var n$2=reader.readInt();rec["dashed"]=[];for(var i$3=0;i$3<n$2;++i$3)rec["dashed"].push(reader.readDouble())}}if(flags&
1<<5)rec["LastModified"]=reader.readString();rec["AP"]["have"]=flags>>6&1;if(flags&1<<7)rec["OUserID"]=reader.readString()}function readAnnotAP(reader,AP){AP["i"]=reader.readInt();AP["x"]=reader.readInt();AP["y"]=reader.readInt();AP["w"]=reader.readInt();AP["h"]=reader.readInt();var n=reader.readInt();for(var i=0;i<n;++i){var APType=reader.readString();if(!AP[APType])AP[APType]={};var APi=AP[APType];var ASType=reader.readString();if(ASType){AP[APType][ASType]={};APi=AP[APType][ASType]}var np1=reader.readInt();
var np2=reader.readInt();APi["retValue"]=np2<<32|np1;APi["BlendMode"]=reader.readByte()}}CFile.prototype["getInteractiveFormsInfo"]=function(){var ptr=this._getInteractiveFormsInfo();var reader=ptr.getReader();if(!reader)return{};var res={};var k=reader.readInt();if(k>0)res["CO"]=[];for(var i=0;i<k;++i)res["CO"].push(reader.readInt());k=reader.readInt();if(k>0)res["Parents"]=[];for(var i$4=0;i$4<k;++i$4){var rec={};rec["i"]=reader.readInt();var flags=reader.readInt();if(flags&1<<0)rec["name"]=reader.readString();
if(flags&1<<1)rec["value"]=reader.readString();if(flags&1<<2)rec["defaultValue"]=reader.readString();if(flags&1<<3){var n=reader.readInt();rec["curIdxs"]=[];for(var i$5=0;i$5<n;++i$5)rec["curIdxs"].push(reader.readInt())}if(flags&1<<4)rec["Parent"]=reader.readInt();if(flags&1<<5){var n$6=reader.readInt();rec["value"]=[];for(var i$7=0;i$7<n$6;++i$7)rec["value"].push(reader.readString())}if(flags&1<<6){var n$8=reader.readInt();rec["Opt"]=[];for(var i$9=0;i$9<n$8;++i$9)rec["Opt"].push(reader.readString())}res["Parents"].push(rec)}res["Fields"]=
[];k=reader.readInt();for(var q=0;reader.isValid()&&q<k;++q){var rec$10={};rec$10["type"]=reader.readByte();readAnnot(reader,rec$10);rec$10["font"]={};rec$10["font"]["name"]=reader.readString();rec$10["font"]["size"]=reader.readDouble();rec$10["font"]["style"]=reader.readInt();var tc=reader.readInt();if(tc){rec$10["font"]["color"]=[];for(var i$11=0;i$11<tc;++i$11)rec$10["font"]["color"].push(reader.readDouble2())}rec$10["alignment"]=reader.readByte();rec$10["flag"]=reader.readInt();rec$10["readOnly"]=
rec$10["flag"]>>0&1;rec$10["required"]=rec$10["flag"]>>1&1;rec$10["noexport"]=rec$10["flag"]>>2&1;var flags$12=reader.readInt();if(flags$12&1<<0)rec$10["userName"]=reader.readString();if(flags$12&1<<1)rec$10["defaultStyle"]=reader.readString();if(flags$12&1<<2)rec$10["font"]["actual"]=reader.readString();if(flags$12&1<<3)rec$10["highlight"]=reader.readByte();if(flags$12&1<<4)rec$10["font"]["key"]=reader.readString();if(flags$12&1<<5){var n$13=reader.readInt();rec$10["BC"]=[];for(var i$14=0;i$14<n$13;++i$14)rec$10["BC"].push(reader.readDouble2())}if(flags$12&
1<<6)rec$10["rotate"]=reader.readInt();if(flags$12&1<<7){var n$15=reader.readInt();rec$10["BG"]=[];for(var i$16=0;i$16<n$15;++i$16)rec$10["BG"].push(reader.readDouble2())}if(flags$12&1<<8)rec$10["defaultValue"]=reader.readString();if(flags$12&1<<17)rec$10["Parent"]=reader.readInt();if(flags$12&1<<18)rec$10["name"]=reader.readString();if(flags$12&1<<19)rec$10["font"]["AP"]=reader.readString();var nAction=reader.readInt();if(nAction>0)rec$10["AA"]={};for(var i$17=0;i$17<nAction;++i$17){var AAType=reader.readString();
rec$10["AA"][AAType]={};readAction(reader,rec$10["AA"][AAType])}if(rec$10["type"]==27){if(flags$12&1<<9)rec$10["value"]=reader.readString();var IFflags=reader.readInt();if(flags$12&1<<10)rec$10["caption"]=reader.readString();if(flags$12&1<<11)rec$10["rolloverCaption"]=reader.readString();if(flags$12&1<<12)rec$10["alternateCaption"]=reader.readString();if(flags$12&1<<13)rec$10["position"]=reader.readByte();if(IFflags&1<<0){rec$10["IF"]={};if(IFflags&1<<1)rec$10["IF"]["SW"]=reader.readByte();if(IFflags&
1<<2)rec$10["IF"]["S"]=reader.readByte();if(IFflags&1<<3){rec$10["IF"]["A"]=[];rec$10["IF"]["A"].push(reader.readDouble());rec$10["IF"]["A"].push(reader.readDouble())}rec$10["IF"]["FB"]=IFflags>>4&1}}else if(rec$10["type"]==29||rec$10["type"]==28){if(flags$12&1<<9)rec$10["value"]=reader.readString();rec$10["style"]=reader.readByte();if(flags$12&1<<14)rec$10["ExportValue"]=reader.readString();rec$10["NoToggleToOff"]=rec$10["flag"]>>14&1;rec$10["radiosInUnison"]=rec$10["flag"]>>25&1}else if(rec$10["type"]==
30){if(flags$12&1<<9)rec$10["value"]=reader.readString();if(flags$12&1<<10)rec$10["maxLen"]=reader.readInt();if(rec$10["flag"]&1<<25)rec$10["richValue"]=reader.readString();rec$10["multiline"]=rec$10["flag"]>>12&1;rec$10["password"]=rec$10["flag"]>>13&1;rec$10["fileSelect"]=rec$10["flag"]>>20&1;rec$10["doNotSpellCheck"]=rec$10["flag"]>>22&1;rec$10["doNotScroll"]=rec$10["flag"]>>23&1;rec$10["comb"]=rec$10["flag"]>>24&1;rec$10["richText"]=rec$10["flag"]>>25&1}else if(rec$10["type"]==31||rec$10["type"]==
32){if(flags$12&1<<9)rec$10["value"]=reader.readString();if(flags$12&1<<10){var n$18=reader.readInt();rec$10["opt"]=[];for(var i$19=0;i$19<n$18;++i$19){var opt1=reader.readString();var opt2=reader.readString();if(opt1=="")rec$10["opt"].push(opt2);else rec$10["opt"].push([opt2,opt1])}}if(flags$12&1<<11)rec$10["TI"]=reader.readInt();if(flags$12&1<<12){var n$20=reader.readInt();rec$10["curIdxs"]=[];for(var i$21=0;i$21<n$20;++i$21)rec$10["curIdxs"].push(reader.readInt())}if(flags$12&1<<13){var n$22=reader.readInt();
rec$10["value"]=[];for(var i$23=0;i$23<n$22;++i$23)rec$10["value"].push(reader.readString())}rec$10["editable"]=rec$10["flag"]>>18&1;rec$10["multipleSelection"]=rec$10["flag"]>>21&1;rec$10["doNotSpellCheck"]=rec$10["flag"]>>22&1;rec$10["commitOnSelChange"]=rec$10["flag"]>>26&1}else if(rec$10["type"]==33)rec$10["Sig"]=flags$12>>9&1;res["Fields"].push(rec$10)}ptr.free();return res};CFile.prototype["getInteractiveFormsAP"]=function(pageIndex,width,height,backgroundColor,nWidget,sView,sButtonView){var nView=
-1;if(sView)if(sView=="N")nView=0;else if(sView=="D")nView=1;else if(sView=="R")nView=2;var nButtonView=-1;if(sButtonView)nButtonView=sButtonView=="Off"?0:1;this.lockPageNumForFontsLoader(pageIndex,UpdateFontsSource.Forms);var ptr=this._getInteractiveFormsAP(width,height,backgroundColor,pageIndex,nWidget,nView,nButtonView);var reader=ptr.getReader();this.unlockPageNumForFontsLoader();if(!reader)return[];var res=[];while(reader.isValid()){var AP={};readAnnotAP(reader,AP);res.push(AP)}ptr.free();return res};
CFile.prototype["getButtonIcons"]=function(pageIndex,width,height,backgroundColor,bBase64,nWidget,sIconView){var nView=-1;if(sIconView)if(sIconView=="I")nView=0;else if(sIconView=="RI")nView=1;else if(sIconView=="IX")nView=2;var ptr=this._getButtonIcons(backgroundColor,pageIndex,bBase64,nWidget,nView);var reader=ptr.getReader();if(!reader)return{};var res={};res["MK"]=[];res["View"]=[];while(reader.isValid()){var MK={};MK["i"]=reader.readInt();var n=reader.readInt();for(var i=0;i<n;++i){var MKType=
reader.readString();MK[MKType]=reader.readInt();var unique=reader.readByte();if(unique){var ViewMK={};ViewMK["j"]=MK[MKType];ViewMK["w"]=reader.readInt();ViewMK["h"]=reader.readInt();if(bBase64)ViewMK["retValue"]=reader.readString();else{var np1=reader.readInt();var np2=reader.readInt();ViewMK["retValue"]=np2<<32|np1}res["View"].push(ViewMK)}}res["MK"].push(MK)}ptr.free();return res};CFile.prototype["getAnnotationsInfo"]=function(pageIndex){if(!this.nativeFile)return[];var ptr=this._getAnnotationsInfo(pageIndex);
var reader=ptr.getReader();if(!reader)return[];var res=[];while(reader.isValid()){var rec={};rec["Type"]=reader.readByte();readAnnot(reader,rec);var flags=0;if(rec["Type"]<18&&rec["Type"]!=1&&rec["Type"]!=15||rec["Type"]==25){flags=reader.readInt();if(flags&1<<0)rec["Popup"]=reader.readInt();if(flags&1<<1)rec["User"]=reader.readString();if(flags&1<<2)rec["CA"]=reader.readDouble();if(flags&1<<3){var n=reader.readInt();rec["RC"]=[];for(var i=0;i<n;++i){var oFont={};oFont["alignment"]=reader.readByte();
var nFontFlag=reader.readInt();oFont["bold"]=nFontFlag>>0&1;oFont["italic"]=nFontFlag>>1&1;oFont["strikethrough"]=nFontFlag>>3&1;oFont["underlined"]=nFontFlag>>4&1;if(nFontFlag&1<<5)oFont["vertical"]=reader.readDouble();if(nFontFlag&1<<6)oFont["actual"]=reader.readString();oFont["size"]=reader.readDouble();oFont["color"]=[];oFont["color"].push(reader.readDouble2());oFont["color"].push(reader.readDouble2());oFont["color"].push(reader.readDouble2());oFont["name"]=reader.readString();oFont["text"]=reader.readString();
rec["RC"].push(oFont)}}if(flags&1<<4)rec["CreationDate"]=reader.readString();if(flags&1<<5)rec["RefTo"]=reader.readInt();if(flags&1<<6)rec["RefToReason"]=reader.readByte();if(flags&1<<7)rec["Subj"]=reader.readString()}if(rec["Type"]==0){if(rec["C"]){rec["IC"]=rec["C"];delete rec["C"]}rec["Open"]=flags>>15&1;if(flags&1<<16)rec["Icon"]=reader.readByte();if(flags&1<<17)rec["StateModel"]=reader.readByte();if(flags&1<<18)rec["State"]=reader.readByte()}else if(rec["Type"]==3){rec["L"]=[];for(var i$24=0;i$24<
4;++i$24)rec["L"].push(reader.readDouble());if(flags&1<<15){rec["LE"]=[];rec["LE"].push(reader.readByte());rec["LE"].push(reader.readByte())}if(flags&1<<16){var n$25=reader.readInt();rec["IC"]=[];for(var i$26=0;i$26<n$25;++i$26)rec["IC"].push(reader.readDouble2())}if(flags&1<<17)rec["LL"]=reader.readDouble();if(flags&1<<18)rec["LLE"]=reader.readDouble();rec["Cap"]=flags>>19&1;if(flags&1<<20)rec["IT"]=reader.readByte();if(flags&1<<21)rec["LLO"]=reader.readDouble();if(flags&1<<22)rec["CP"]=reader.readByte();
if(flags&1<<23){rec["CO"]=[];rec["CO"].push(reader.readDouble());rec["CO"].push(reader.readDouble())}}else if(rec["Type"]==14){var n$27=reader.readInt();rec["InkList"]=[];for(var i$28=0;i$28<n$27;++i$28){rec["InkList"][i$28]=[];var m=reader.readInt();for(var j=0;j<m;++j)rec["InkList"][i$28].push(reader.readDouble())}}else if(rec["Type"]>7&&rec["Type"]<12){var n$29=reader.readInt();rec["QuadPoints"]=[];for(var i$30=0;i$30<n$29;++i$30)rec["QuadPoints"].push(reader.readDouble())}else if(rec["Type"]==
4||rec["Type"]==5){if(flags&1<<15){rec["RD"]=[];for(var i$31=0;i$31<4;++i$31)rec["RD"].push(reader.readDouble())}if(flags&1<<16){var n$32=reader.readInt();rec["IC"]=[];for(var i$33=0;i$33<n$32;++i$33)rec["IC"].push(reader.readDouble2())}}else if(rec["Type"]==6||rec["Type"]==7){var nVertices=reader.readInt();rec["Vertices"]=[];for(var i$34=0;i$34<nVertices;++i$34)rec["Vertices"].push(reader.readDouble());if(flags&1<<15){rec["LE"]=[];rec["LE"].push(reader.readByte());rec["LE"].push(reader.readByte())}if(flags&
1<<16){var n$35=reader.readInt();rec["IC"]=[];for(var i$36=0;i$36<n$35;++i$36)rec["IC"].push(reader.readDouble2())}if(flags&1<<20)rec["IT"]=reader.readByte()}else if(rec["Type"]==2){if(rec["C"]){rec["IC"]=rec["C"];delete rec["C"]}rec["alignment"]=reader.readByte();rec["Rotate"]=reader.readInt();if(flags&1<<15){rec["RD"]=[];for(var i$37=0;i$37<4;++i$37)rec["RD"].push(reader.readDouble())}if(flags&1<<16){var n$38=reader.readInt();rec["CL"]=[];for(var i$39=0;i$39<n$38;++i$39)rec["CL"].push(reader.readDouble())}if(flags&
1<<17)rec["defaultStyle"]=reader.readString();if(flags&1<<18)rec["LE"]=reader.readByte();if(flags&1<<20)rec["IT"]=reader.readByte();if(flags&1<<21){var n$40=reader.readInt();rec["C"]=[];for(var i$41=0;i$41<n$40;++i$41)rec["C"].push(reader.readDouble2())}}else if(rec["Type"]==13){if(flags&1<<15){rec["RD"]=[];for(var i$42=0;i$42<4;++i$42)rec["RD"].push(reader.readDouble())}if(flags&1<<16)rec["Sy"]=reader.readByte()}else if(rec["Type"]==16){if(flags&1<<15)rec["Icon"]=reader.readString();if(flags&1<<
16)rec["FS"]=reader.readString();if(flags&1<<17){rec["F"]={};rec["F"]["FileName"]=reader.readString()}if(flags&1<<18){rec["UF"]={};rec["UF"]["FileName"]=reader.readString()}if(flags&1<<19){rec["DOS"]={};rec["DOS"]["FileName"]=reader.readString()}if(flags&1<<20){rec["Mac"]={};rec["Mac"]["FileName"]=reader.readString()}if(flags&1<<21){rec["Unix"]={};rec["Unix"]["FileName"]=reader.readString()}if(flags&1<<22){rec["ID"]=[];rec["ID"].push(reader.readString());rec["ID"].push(reader.readString())}rec["V"]=
flags&1<<23;if(flags&1<<24){var flag=reader.readInt();if(flag&1<<0){var n$43=reader.readInt();var np1=reader.readInt();var np2=reader.readInt();var pPoint=np2<<32|np1;rec["F"]["File"]=new Uint8Array(Module["HEAP8"].buffer,pPoint,n$43);Module["_free"](pPoint)}if(flag&1<<1){var n$44=reader.readInt();var np1$45=reader.readInt();var np2$46=reader.readInt();var pPoint$47=np2$46<<32|np1$45;rec["UF"]["File"]=new Uint8Array(Module["HEAP8"].buffer,pPoint$47,n$44);Module["_free"](pPoint$47)}if(flag&1<<2){var n$48=
reader.readInt();var np1$49=reader.readInt();var np2$50=reader.readInt();var pPoint$51=np2$50<<32|np1$49;rec["DOS"]["File"]=new Uint8Array(Module["HEAP8"].buffer,pPoint$51,n$48);Module["_free"](pPoint$51)}if(flag&1<<3){var n$52=reader.readInt();var np1$53=reader.readInt();var np2$54=reader.readInt();var pPoint$55=np2$54<<32|np1$53;rec["Mac"]["File"]=new Uint8Array(Module["HEAP8"].buffer,pPoint$55,n$52);Module["_free"](pPoint$55)}if(flag&1<<4){var n$56=reader.readInt();var np1$57=reader.readInt();
var np2$58=reader.readInt();var pPoint$59=np2$58<<32|np1$57;rec["Unix"]["File"]=new Uint8Array(Module["HEAP8"].buffer,pPoint$59,n$56);Module["_free"](pPoint$59)}}if(flags&1<<26)rec["Desc"]=reader.readString()}res.push(rec)}ptr.free();return res};CFile.prototype["getAnnotationsAP"]=function(pageIndex,width,height,backgroundColor,nAnnot,sView){var nView=-1;if(sView)if(sView=="N")nView=0;else if(sView=="D")nView=1;else if(sView=="R")nView=2;this.lockPageNumForFontsLoader(pageIndex,UpdateFontsSource.Annotation);
var ptr=this._getAnnotationsAP(width,height,backgroundColor,pageIndex,nAnnot,nView);var reader=ptr.getReader();this.unlockPageNumForFontsLoader();if(!reader)return[];var res=[];while(reader.isValid()){var AP={};readAnnotAP(reader,AP);res.push(AP)}ptr.free();return res};CFile.prototype["scanPage"]=function(page,mode){var ptr=this._scanPage(page,mode);var reader=ptr.getReader();if(!reader)return[];var shapesCount=reader.readInt();var shapes=new Array(shapesCount);for(var i=0;i<shapesCount;i++)shapes[i]=
reader.readString();ptr.free();return shapes};CFile.prototype["getImageBase64"]=function(rId){var strId=""+rId;if(this.scannedImages[strId])return this.scannedImages[strId];this.scannedImages[strId]=this._getImageBase64(rId);return this.scannedImages[strId]};CFile.prototype["changeImageUrl"]=function(baseUrl,resultUrl){for(var i in this.scannedImages)if(this.scannedImages[i]==baseUrl)this.scannedImages[i]=resultUrl};CFile.prototype["getUint8Array"]=function(ptr,len){return this._getUint8Array(ptr,
len)};CFile.prototype["getUint8ClampedArray"]=function(ptr,len){return this._getUint8ClampedArray(ptr,len)};CFile.prototype["free"]=function(pointer){this._free(pointer)};CFile.prototype["getPagePixmap"]=function(pageIndex,width,height,backgroundColor){var [i,page]=this.getOriginPage(pageIndex);if(!page||page.fonts.length>0)return null;this.lockPageNumForFontsLoader(i,UpdateFontsSource.Page);var ptr=this._getPixmap(pageIndex,width,height,backgroundColor);this.unlockPageNumForFontsLoader();if(page.fonts.length>
0){this._free(ptr);ptr=null}return ptr};function addToArrayAsDictionary(arr,value){var isFound=false;for(var i=0,len=arr.length;i<len;i++)if(arr[i]==value){isFound=true;break}if(!isFound)arr.push(value);return isFound}function fontToMemory(file,isCheck){var idBuffer=file.GetID().toUtf8();var idPointer=Module["_malloc"](idBuffer.length);Module["HEAP8"].set(idBuffer,idPointer);if(isCheck){var nExist=Module["_IsFontBinaryExist"](idPointer);if(nExist!=0){Module["_free"](idPointer);return}}var stream_index=
file.GetStreamIndex();var stream=AscFonts.getFontStream(stream_index);var streamPointer=Module["_malloc"](stream.size);Module["HEAP8"].set(stream.data,streamPointer);Module["_SetFontBinary"](idPointer,streamPointer,stream.size);Module["_free"](streamPointer);Module["_free"](idPointer)}CFile.prototype["addPage"]=function(pageIndex,pageObj){this.pages.splice(pageIndex,0,pageObj);if(this.fontStreams)for(var i in this.fontStreams){var pages=this.fontStreams[i].pages;for(var j=0;j<pages.length;j++)if(pages[j]>=
pageIndex)pages[j]+=1}};CFile.prototype["removePage"]=function(pageIndex){var result=this.pages.splice(pageIndex,1);if(this.fontStreams)for(var i in this.fontStreams){var pages=this.fontStreams[i].pages;for(var j=0;j<pages.length;j++)if(pages[j]>pageIndex)pages[j]-=1;else if(pages[j]==pageIndex)pages.splice(j,1)}return result};self["AscViewer"]["Free"]=function(pointer){CFile.prototype._free(pointer)};self["AscViewer"]["InitializeFonts"]=function(basePath){return CFile.prototype._InitializeFonts(basePath)};
self["AscViewer"]["CheckStreamId"]=function(data,status){return CFile.prototype._CheckStreamId(data,status)};self["AscViewer"]["CDrawingFile"]=CFile;self.drawingFile=null})(window,undefined);

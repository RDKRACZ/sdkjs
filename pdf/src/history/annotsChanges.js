/*
 * (c) Copyright Ascensio System SIA 2010-2024
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

"use strict";

AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Rect]			= CChangesPDFAnnotRect;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_RD]				= CChangesPDFAnnotRD;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Vertices]		= CChangesPDFAnnotVertices;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Contents]		= CChangesPDFAnnotContents;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Pos]				= CChangesPDFAnnotPos;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Page]			= CChangesPDFAnnotPage;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Replies]			= CChangesPDFAnnotReplies;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Creation_Date]	= CChangesPDFAnnotCreationDate;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Mod_Date]		= CChangesPDFAnnotModDate;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Author]			= CChangesPDFAnnotAuthor;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Display]			= CChangesPDFAnnotDisplay;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Name]			= CChangesPDFAnnotName;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_File_Idx]		= CChangesPDFAnnotApIdx;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Document]		= CChangesAnnotObjectProperty;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Stroke]			= CChangesPDFAnnotStroke;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_StrokeWidth]		= CChangesPDFAnnotStrokeWidth;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Annot_Opacity]			= CChangesPDFAnnotOpacity;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Comment_Data]			= CChangesPDFCommentData;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Ink_Points]			= CChangesPDFInkPoints;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Ink_FlipV]				= CChangesPDFInkFlipV;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Ink_FlipH]				= CChangesPDFInkFlipH;
AscDFH.changesFactory[AscDFH.historyitem_Pdf_Line_Points]			= CChangesPDFLinePoints;
AscDFH.changesFactory[AscDFH.historyitem_type_Pdf_Annot_FreeText_CL]			= CChangesFreeTextCallout;
AscDFH.changesFactory[AscDFH.historyitem_type_Pdf_Annot_FreeText_RC]			= CChangesPDFFreeTextRC;


let annotChangesMap = {};
window['AscDFH'].annotChangesMap = annotChangesMap;

function CChangesAnnotObjectProperty(Class, Type, OldPr, NewPr) {
	this.Type = Type;
	var _OldPr = OldPr && OldPr.Get_Id ? OldPr.Get_Id() : undefined;
	var _NewPr = NewPr && NewPr.Get_Id ? NewPr.Get_Id() : undefined;
	AscDFH.CChangesBaseStringProperty.call(this, Class, _OldPr, _NewPr);
}
CChangesAnnotObjectProperty.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesAnnotObjectProperty.prototype.constructor = CChangesAnnotObjectProperty;

CChangesAnnotObjectProperty.prototype.ReadFromBinary = function (reader) {
	reader.Seek2(reader.GetCurPos() - 4);
	this.Type = reader.GetLong();
	AscDFH.CChangesBaseStringProperty.prototype.ReadFromBinary.call(this, reader);
};
CChangesAnnotObjectProperty.prototype.private_SetValue = function (Value) {
	var oObject = null;
	if (typeof Value === "string") {
		oObject = AscCommon.g_oTableId.Get_ById(Value);
		if (!oObject) {
			oObject = null;
		}
	}
	if (AscDFH.annotChangesMap[this.Type]) {
		AscDFH.annotChangesMap[this.Type](this.Class, oObject);
	}
};
CChangesAnnotObjectProperty.prototype.Load = function(){
	this.Redo();
	this.RefreshRecalcData();
};

function CChangesAnnotArrayOfDoubleProperty(Class, Old, New) {
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New);
}
CChangesAnnotArrayOfDoubleProperty.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesAnnotArrayOfDoubleProperty.prototype.constructor = CChangesAnnotArrayOfDoubleProperty;

CChangesAnnotArrayOfDoubleProperty.prototype.WriteToBinary = function(Writer)
{
	var nNewCount = this.New.length;
	Writer.WriteLong(nNewCount);
	for (var nIndex = 0; nIndex < nNewCount; ++nIndex)
		Writer.WriteDouble(this.New[nIndex]);

	var nOldCount = this.Old.length;
	Writer.WriteLong(nOldCount);
	for (var nIndex = 0; nIndex < nOldCount; ++nIndex)
		Writer.WriteDouble(this.Old[nIndex]);
};
CChangesAnnotArrayOfDoubleProperty.prototype.ReadFromBinary = function(Reader)
{
	// Long : Count of the columns in the new grid
	// Array of double : widths of columns in the new grid
	// Long : Count of the columns in the old grid
	// Array of double : widths of columns in the old grid

	var nCount = Reader.GetLong();
	this.New = [];
	for (var nIndex = 0; nIndex < nCount; ++nIndex)
		this.New[nIndex] = Reader.GetDouble();

	nCount = Reader.GetLong();
	this.Old = [];
	for (var nIndex = 0; nIndex < nCount; ++nIndex)
		this.Old[nIndex] = Reader.GetDouble();
};

CChangesAnnotArrayOfDoubleProperty.prototype.Load = function(){
	this.Redo();
	this.RefreshRecalcData();
};

window['AscDFH'].CChangesAnnotObjectProperty = CChangesAnnotObjectProperty;
window['AscDFH'].CChangesAnnotArrayOfDoubleProperty = CChangesAnnotArrayOfDoubleProperty;

annotChangesMap[AscDFH.historyitem_Pdf_Annot_Document] = function (oAnnot, value) {
	oAnnot.SetDocument(value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseObjectProperty}
 */
function CChangesPDFCommentData(Class, Old, New, Color)
{
	AscDFH.CChangesBaseObjectProperty.call(this, Class, Old, New, Color);
}
CChangesPDFCommentData.prototype = Object.create(AscDFH.CChangesBaseObjectProperty.prototype);
CChangesPDFCommentData.prototype.constructor = CChangesPDFCommentData;
CChangesPDFCommentData.prototype.Type = AscDFH.historyitem_Pdf_Comment_Data;
CChangesPDFCommentData.prototype.private_SetValue = function(Value)
{
	let oComment = this.Class;
	oComment.EditCommentData(Value);
	let AscCommentData = oComment.GetAscCommentData();
	let CommentData = new AscCommon.CCommentData();
	CommentData.Read_FromAscCommentData(AscCommentData);

	editor.sync_ChangeCommentData(oComment.GetId(), CommentData);
};
CChangesPDFCommentData.prototype.private_CreateObject = function()
{
	return new AscCommon.CCommentData();
};

/**
 * @constructor
 * @extends {AscDFH.CChangesAnnotArrayOfDoubleProperty}
 */
function CChangesPDFInkPoints(Class, Pos, Items, isAdd) {
	AscDFH.CChangesBaseContentChange.call(this, Class, Pos, Items, isAdd);
}

CChangesPDFInkPoints.prototype = Object.create(AscDFH.CChangesBaseContentChange.prototype);
CChangesPDFInkPoints.prototype.constructor = CChangesPDFInkPoints;
CChangesPDFInkPoints.prototype.Type = AscDFH.historyitem_Pdf_Ink_Points;

window['AscDFH'].CChangesPDFInkPoints = CChangesPDFInkPoints;

CChangesPDFInkPoints.prototype.WriteToBinary = function (writer) {
	writer.WriteBool(this.IsAdd());
	writer.WriteLong(this.Pos);
	
	// write points array
	let nCount = this.Items.length;
	writer.WriteLong(nCount);
	for (let nIndex = 0; nIndex < nCount; ++nIndex)
		writer.WriteDouble(this.Items[nIndex]);
};
CChangesPDFInkPoints.prototype.ReadFromBinary = function (reader) {
	reader.Seek2(reader.GetCurPos() - 4);
	this.Type = reader.GetLong();
	this.Add = reader.GetBool();
	this.Pos = reader.GetLong();
	
	// read points array
	let nCount = reader.GetLong();
	this.Items = [];
	for (var nIndex = 0; nIndex < nCount; ++nIndex)
		this.Items[nIndex] = reader.GetDouble();
};

CChangesPDFInkPoints.prototype.private_GetChangedArray = function () {
	return this.Class._gestures;
};

CChangesPDFInkPoints.prototype.private_GetContentChanges = function () {
	if (this.Class && this.Class.getContentChangesByType) {
		return this.Class.getContentChangesByType(this.Type);
	}
	return null;
};

CChangesPDFInkPoints.prototype.private_InsertInArrayLoad = function () {
	if (this.Items.length <= 0)
		return;

	let aChangedArray = this.private_GetChangedArray();
	if (null !== aChangedArray) {
		aChangedArray.splice(this.Pos, 0, this.Items);
	}
};

CChangesPDFInkPoints.prototype.private_RemoveInArrayLoad = function () {

	var aChangedArray = this.private_GetChangedArray();
	if (null !== aChangedArray) {
		aChangedArray.splice(this.Pos, 1);
	}
};

CChangesPDFInkPoints.prototype.private_InsertInArrayUndoRedo = function () {
	var aChangedArray = this.private_GetChangedArray();
	if (null !== aChangedArray) {
		aChangedArray.splice(this.Pos, 0, this.Items);
	}
};

CChangesPDFInkPoints.prototype.private_RemoveInArrayUndoRedo = function () {

	var aChangedArray = this.private_GetChangedArray();
	if (null !== aChangedArray) {
		aChangedArray.splice(this.Pos, 1);
	}
};

CChangesPDFInkPoints.prototype.Load = function () {
	if (this.IsAdd()) {
		this.private_InsertInArrayLoad();
	}
	else {
		this.private_RemoveInArrayLoad();
	}
	this.RefreshRecalcData();
};

CChangesPDFInkPoints.prototype.Undo = function () {
	if (this.IsAdd()) {
		this.private_RemoveInArrayUndoRedo();
	}
	else {
		this.private_InsertInArrayUndoRedo();
	}
};

CChangesPDFInkPoints.prototype.Redo = function () {
	if (this.IsAdd()) {
		this.private_InsertInArrayUndoRedo();
	}
	else {
		this.private_RemoveInArrayUndoRedo();
	}
};
CChangesPDFInkPoints.prototype.IsContentChange = function () {
	return false;
};
CChangesPDFInkPoints.prototype.Copy = function()
{
	var oChanges = new this.constructor(this.Class, this.Type, this.Pos, this.Items, this.Add);

	oChanges.UseArray = this.UseArray;

	for (var nIndex = 0, nCount = this.PosArray.length; nIndex < nCount; ++nIndex)
		oChanges.PosArray[nIndex] = this.PosArray[nIndex];

	return oChanges;
};
CChangesPDFInkPoints.prototype.ConvertToSimpleChanges = function()
{
	let arrSimpleActions = this.ConvertToSimpleActions();
	let arrChanges       = [];
	for (let nIndex = 0, nCount = arrSimpleActions.length; nIndex < nCount; ++nIndex)
	{
		let oAction = arrSimpleActions[nIndex];
		let oChange = new this.constructor(this.Class, this.Type, oAction.Pos, [oAction.Item], oAction.Add);
		arrChanges.push(oChange);
	}
	return arrChanges;
};
CChangesPDFInkPoints.prototype.CreateReverseChange = function(){
	var oRet = this.private_CreateReverseChange(this.constructor);
	oRet.Type = this.Type;
	oRet.Pos = this.Pos;
	return oRet;
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseBoolProperty}
 */
function CChangesPDFInkFlipV(Class, Old, New, Color)
{
	AscDFH.CChangesBaseBoolProperty.call(this, Class, Old, New, Color);
}
CChangesPDFInkFlipV.prototype = Object.create(AscDFH.CChangesBaseBoolProperty.prototype);
CChangesPDFInkFlipV.prototype.constructor = CChangesPDFInkFlipV;
CChangesPDFInkFlipV.prototype.Type = AscDFH.historyitem_Pdf_Ink_FlipV;
CChangesPDFInkFlipV.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetFlipV(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseBoolProperty}
 */
function CChangesPDFInkFlipH(Class, Old, New, Color)
{
	AscDFH.CChangesBaseBoolProperty.call(this, Class, Old, New, Color);
}
CChangesPDFInkFlipH.prototype = Object.create(AscDFH.CChangesBaseBoolProperty.prototype);
CChangesPDFInkFlipH.prototype.constructor = CChangesPDFInkFlipH;
CChangesPDFInkFlipH.prototype.Type = AscDFH.historyitem_Pdf_Ink_FlipH;
CChangesPDFInkFlipH.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetFlipH(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesAnnotArrayOfDoubleProperty}
 */
function CChangesPDFAnnotRect(Class, Old, New, Color)
{
	AscDFH.CChangesAnnotArrayOfDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotRect.prototype = Object.create(AscDFH.CChangesAnnotArrayOfDoubleProperty.prototype);
CChangesPDFAnnotRect.prototype.constructor = CChangesPDFAnnotRect;
CChangesPDFAnnotRect.prototype.Type = AscDFH.historyitem_Pdf_Annot_Rect;
CChangesPDFAnnotRect.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetRect(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesAnnotArrayOfDoubleProperty}
 */
function CChangesPDFAnnotStroke(Class, Old, New, Color)
{
	AscDFH.CChangesAnnotArrayOfDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotStroke.prototype = Object.create(AscDFH.CChangesAnnotArrayOfDoubleProperty.prototype);
CChangesPDFAnnotStroke.prototype.constructor = CChangesPDFAnnotStroke;
CChangesPDFAnnotStroke.prototype.Type = AscDFH.historyitem_Pdf_Annot_Stroke;
CChangesPDFAnnotStroke.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetStrokeColor(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseDoubleProperty}
 */
function CChangesPDFAnnotStrokeWidth(Class, Old, New, Color)
{
	AscDFH.CChangesBaseDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotStrokeWidth.prototype = Object.create(AscDFH.CChangesBaseDoubleProperty.prototype);
CChangesPDFAnnotStrokeWidth.prototype.constructor = CChangesPDFAnnotStrokeWidth;
CChangesPDFAnnotStrokeWidth.prototype.Type = AscDFH.historyitem_Pdf_Annot_StrokeWidth;
CChangesPDFAnnotStrokeWidth.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetWidth(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseDoubleProperty}
 */
function CChangesPDFAnnotOpacity(Class, Old, New, Color)
{
	AscDFH.CChangesBaseDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotOpacity.prototype = Object.create(AscDFH.CChangesBaseDoubleProperty.prototype);
CChangesPDFAnnotOpacity.prototype.constructor = CChangesPDFAnnotOpacity;
CChangesPDFAnnotOpacity.prototype.Type = AscDFH.historyitem_Pdf_Annot_Opacity;
CChangesPDFAnnotOpacity.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetOpacity(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesAnnotArrayOfDoubleProperty}
 */
function CChangesPDFAnnotRD(Class, Old, New, Color)
{
	AscDFH.CChangesAnnotArrayOfDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotRD.prototype = Object.create(AscDFH.CChangesAnnotArrayOfDoubleProperty.prototype);
CChangesPDFAnnotRD.prototype.constructor = CChangesPDFAnnotRD;
CChangesPDFAnnotRD.prototype.Type = AscDFH.historyitem_Pdf_Annot_RD;
CChangesPDFAnnotRD.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetRectangleDiff(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesFreeTextCallout(Class, Old, New, Color)
{
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New, Color);
}
CChangesFreeTextCallout.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesFreeTextCallout.prototype.constructor = CChangesFreeTextCallout;
CChangesFreeTextCallout.prototype.Type = AscDFH.historyitem_type_Pdf_Annot_FreeText_CL;
CChangesFreeTextCallout.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetCallout(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesPDFFreeTextRC(Class, Old, New, Color)
{
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New, Color);
}
CChangesPDFFreeTextRC.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesPDFFreeTextRC.prototype.constructor = CChangesPDFFreeTextRC;
CChangesPDFFreeTextRC.prototype.Type = AscDFH.historyitem_type_Pdf_Annot_FreeText_RC;
CChangesPDFFreeTextRC.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetRichContents(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesPDFAnnotVertices(Class, Old, New, Color)
{
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotVertices.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesPDFAnnotVertices.prototype.constructor = CChangesPDFAnnotVertices;
CChangesPDFAnnotVertices.prototype.Type = AscDFH.historyitem_Pdf_Annot_Rect;
CChangesPDFAnnotVertices.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetVertices(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesAnnotArrayOfDoubleProperty}
 */
function CChangesPDFAnnotPos(Class, Old, New, Color)
{
	AscDFH.CChangesAnnotArrayOfDoubleProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotPos.prototype = Object.create(AscDFH.CChangesAnnotArrayOfDoubleProperty.prototype);
CChangesPDFAnnotPos.prototype.constructor = CChangesPDFAnnotPos;
CChangesPDFAnnotPos.prototype.Type = AscDFH.historyitem_Pdf_Annot_Pos;
CChangesPDFAnnotPos.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetPosition(Value[0], Value[1], true);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseStringProperty}
 */
function CChangesPDFAnnotContents(Class, Old, New, Color)
{
	AscDFH.CChangesBaseStringProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotContents.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesPDFAnnotContents.prototype.constructor = CChangesPDFAnnotContents;
CChangesPDFAnnotContents.prototype.Type = AscDFH.historyitem_Pdf_Annot_Contents;
CChangesPDFAnnotContents.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetContents(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesPDFAnnotReplies(Class, Old, New, Color)
{
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotReplies.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesPDFAnnotReplies.prototype.constructor = CChangesPDFAnnotReplies;
CChangesPDFAnnotReplies.prototype.Type = AscDFH.historyitem_Pdf_Annot_Replies;
CChangesPDFAnnotReplies.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetReplies(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseStringProperty}
 */
function CChangesPDFAnnotCreationDate(Class, Old, New, Color)
{
	AscDFH.CChangesBaseStringProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotCreationDate.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesPDFAnnotCreationDate.prototype.constructor = CChangesPDFAnnotCreationDate;
CChangesPDFAnnotCreationDate.prototype.Type = AscDFH.historyitem_Pdf_Annot_Creation_Date;
CChangesPDFAnnotCreationDate.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetCreationDate(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseStringProperty}
 */
function CChangesPDFAnnotModDate(Class, Old, New, Color)
{
	AscDFH.CChangesBaseStringProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotModDate.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesPDFAnnotModDate.prototype.constructor = CChangesPDFAnnotModDate;
CChangesPDFAnnotModDate.prototype.Type = AscDFH.historyitem_Pdf_Annot_Mod_Date;
CChangesPDFAnnotModDate.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetModDate(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseStringProperty}
 */
function CChangesPDFAnnotAuthor(Class, Old, New, Color)
{
	AscDFH.CChangesBaseStringProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotAuthor.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesPDFAnnotAuthor.prototype.constructor = CChangesPDFAnnotAuthor;
CChangesPDFAnnotAuthor.prototype.Type = AscDFH.historyitem_Pdf_Annot_Author;
CChangesPDFAnnotAuthor.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetAuthor(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseLongProperty}
 */
function CChangesPDFAnnotDisplay(Class, Old, New, Color)
{
	AscDFH.CChangesBaseLongProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotDisplay.prototype = Object.create(AscDFH.CChangesBaseLongProperty.prototype);
CChangesPDFAnnotDisplay.prototype.constructor = CChangesPDFAnnotDisplay;
CChangesPDFAnnotDisplay.prototype.Type = AscDFH.historyitem_Pdf_Annot_Display;
CChangesPDFAnnotDisplay.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetDisplay(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseStringProperty}
 */
function CChangesPDFAnnotName(Class, Old, New, Color)
{
	AscDFH.CChangesBaseStringProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotName.prototype = Object.create(AscDFH.CChangesBaseStringProperty.prototype);
CChangesPDFAnnotName.prototype.constructor = CChangesPDFAnnotName;
CChangesPDFAnnotName.prototype.Type = AscDFH.historyitem_Pdf_Annot_Name;
CChangesPDFAnnotName.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetName(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseLongProperty}
 */
function CChangesPDFAnnotApIdx(Class, Old, New, Color)
{
	AscDFH.CChangesBaseLongProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotApIdx.prototype = Object.create(AscDFH.CChangesBaseLongProperty.prototype);
CChangesPDFAnnotApIdx.prototype.constructor = CChangesPDFAnnotApIdx;
CChangesPDFAnnotApIdx.prototype.Type = AscDFH.historyitem_Pdf_Annot_File_Idx;
CChangesPDFAnnotApIdx.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetApIdx(Value);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseLongProperty}
 */
function CChangesPDFAnnotPage(Class, Old, New, Color)
{
	AscDFH.CChangesBaseLongProperty.call(this, Class, Old, New, Color);
}
CChangesPDFAnnotPage.prototype = Object.create(AscDFH.CChangesBaseLongProperty.prototype);
CChangesPDFAnnotPage.prototype.constructor = CChangesPDFAnnotPage;
CChangesPDFAnnotPage.prototype.Type = AscDFH.historyitem_Pdf_Annot_Page;
CChangesPDFAnnotPage.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetPage(Value, true);
};

/**
 * @constructor
 * @extends {AscDFH.CChangesBaseProperty}
 */
function CChangesPDFLinePoints(Class, Old, New, Color)
{
	AscDFH.CChangesBaseProperty.call(this, Class, Old, New, Color);
}
CChangesPDFLinePoints.prototype = Object.create(AscDFH.CChangesBaseProperty.prototype);
CChangesPDFLinePoints.prototype.constructor = CChangesPDFLinePoints;
CChangesPDFLinePoints.prototype.Type = AscDFH.historyitem_Pdf_Line_Geometry;
CChangesPDFLinePoints.prototype.private_SetValue = function(Value)
{
	let oAnnot = this.Class;
	oAnnot.SetLinePoints(Value, true);
};

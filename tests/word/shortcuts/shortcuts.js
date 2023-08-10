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
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
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

'use strict';


(function (window)
{
	const testHotkeyEvents = AscTestShortcut.testHotkeyEvents;
	const testHotkeyActions = AscTestShortcut.testHotkeyActions;

	let logicDocument = AscTest.CreateLogicDocument();

	const pageWidth = 100;
	const pageHeight = 100;
	logicDocument.Set_DocumentPageSize(pageWidth, pageHeight);
	var props = new Asc.CDocumentSectionProps();
	props.put_TopMargin(0);
	props.put_LeftMargin(0);
	props.put_BottomMargin(0);
	props.put_RightMargin(0);
	logicDocument.Set_SectionProps(props);

	AscFormat.CHART_STYLE_MANAGER.init();

	const drawingDocument = editor.WordControl.m_oDrawingDocument;
	drawingDocument.GetVisibleMMHeight = function ()
	{
		return 100;
	};

	let isTrack = false;
	drawingDocument.StartTrackText = function ()
	{
		isTrack = true;
	};
	drawingDocument.EndTrackText = function ()
	{
		isTrack = false;
	};
	drawingDocument.CancelTrackText = function ()
	{
		isTrack = false;
	};

	drawingDocument.IsTrackText = function ()
	{
		return isTrack;
	};

	drawingDocument.SetCursorType = function () {};
	drawingDocument.OnRePaintAttack = function() {};
	drawingDocument.IsFreezePage = function() {};
	drawingDocument.Set_RulerState_HdrFtr = function() {};
	drawingDocument.IsTrackText  = function() {};
	drawingDocument.ConvertCoordsToCursorWR  = function(X, Y) {return {X: X, Y: Y}};
	drawingDocument.OnUpdateOverlay = function() {};

	editor.getShortcut = function (e)
	{
		if (typeof e === 'number')
		{
			return e;
		}
	};
	editor.FontSizeIn = function ()
	{
		logicDocument.IncreaseDecreaseFontSize(true);
	};
	editor.FontSizeOut = function ()
	{
		logicDocument.IncreaseDecreaseFontSize(false);
	};
	editor.StartAddShape = function ()
	{
		this.isStartAddShape = true;
	};

	editor.retrieveFormatPainterData = Asc.asc_docs_api.prototype.retrieveFormatPainterData.bind(editor);
	editor.get_ShowParaMarks = Asc.asc_docs_api.prototype.get_ShowParaMarks.bind(editor);
	editor.put_ShowParaMarks = Asc.asc_docs_api.prototype.put_ShowParaMarks.bind(editor);
	editor.sync_ShowParaMarks = Asc.asc_docs_api.prototype.sync_ShowParaMarks.bind(editor);
	editor.private_GetLogicDocument = Asc.asc_docs_api.prototype.private_GetLogicDocument.bind(editor);
	editor.asc_AddTableOfContents = Asc.asc_docs_api.prototype.asc_AddTableOfContents.bind(editor);
	editor.asc_registerCallback = Asc.asc_docs_api.prototype.asc_registerCallback.bind(editor);
	editor.asc_unregisterCallback = Asc.asc_docs_api.prototype.asc_unregisterCallback.bind(editor);
	editor.sendEvent = Asc.asc_docs_api.prototype.sendEvent.bind(editor);
	editor.sync_DialogAddHyperlink = Asc.asc_docs_api.prototype.sync_DialogAddHyperlink.bind(editor);
	editor.sync_ParaStyleName = Asc.asc_docs_api.prototype.sync_ParaStyleName.bind(editor);
	editor.sync_MouseMoveStartCallback = Asc.asc_docs_api.prototype.sync_MouseMoveStartCallback.bind(editor);
	editor.sync_MouseMoveCallback = Asc.asc_docs_api.prototype.sync_MouseMoveCallback.bind(editor);
	editor.sync_MouseMoveEndCallback = Asc.asc_docs_api.prototype.sync_MouseMoveEndCallback.bind(editor);
	editor.sync_HideComment = Asc.asc_docs_api.prototype.sync_HideComment.bind(editor);
	editor.sync_ContextMenuCallback = Asc.asc_docs_api.prototype.sync_ContextMenuCallback.bind(editor);
	editor.asc_AddMath = Asc.asc_docs_api.prototype.asc_AddMath2.bind(editor);
	editor._onEndLoadSdk = Asc.asc_docs_api.prototype._onEndLoadSdk.bind(editor);
	editor.sync_StartAddShapeCallback = Asc.asc_docs_api.prototype.sync_StartAddShapeCallback.bind(editor);
	editor.SetPaintFormat = Asc.asc_docs_api.prototype.SetPaintFormat.bind(editor);
	editor.SetMarkerFormat = Asc.asc_docs_api.prototype.SetMarkerFormat.bind(editor);
	editor.sync_MarkerFormatCallback = Asc.asc_docs_api.prototype.sync_MarkerFormatCallback.bind(editor);
	editor.sync_PaintFormatCallback = Asc.asc_docs_api.prototype.sync_PaintFormatCallback.bind(editor);
	editor.sync_EndAddShape = function () {};
	editor.isDocumentEditor = true;

	AscCommon.CDocsCoApi.prototype.askSaveChanges = function (callback)
	{
		window.setTimeout(function ()
		{
			callback({"saveLock": false});
		}, 0);
	};

	function GoToHeader(page)
	{
		logicDocument.SetDocPosType(AscCommonWord.docpostype_HdrFtr);
		const event = new AscCommon.CMouseEventHandler();
		event.ClickCount = 1;
		event.Button = 0;
		event.Type = AscCommon.g_mouse_event_type_down;

		logicDocument.OnMouseDown(event, 0, 0, page);

		event.Type = AscCommon.g_mouse_event_type_up;
		logicDocument.OnMouseUp(event, 0, 0, page);
		logicDocument.MoveCursorLeft();
	}

	function GoToFooter(page)
	{
		logicDocument.SetDocPosType(AscCommonWord.docpostype_HdrFtr);
		const event = new AscCommon.CMouseEventHandler();
		event.ClickCount = 1;
		event.Button = 0;
		event.Type = AscCommon.g_mouse_event_type_down;

		logicDocument.OnMouseDown(event, 0, pageHeight, page);

		event.Type = AscCommon.g_mouse_event_type_up;
		logicDocument.OnMouseUp(event, 0, pageHeight, page);
		logicDocument.MoveCursorLeft();
	}

	function RemoveHeader(page)
	{
		logicDocument.RemoveHdrFtr(page, true);
	}

	function RemoveFooter(page)
	{
		logicDocument.RemoveHdrFtr(page, false);
	}

	function ExecuteShortcut(type)
	{
		return logicDocument.OnKeyDown(type);
	}

	function ExecuteHotkey(type, eventIndex)
	{
		const event = testHotkeyEvents[type][eventIndex || 0];
		return ExecuteShortcut(event);
	}

	function ClearDocumentAndAddParagraph(text)
	{
		logicDocument.RemoveSelection();
		AscTest.ClearDocument();
		const paragraph = CreateParagraphWithText(text);
		logicDocument.AddToContent(0, paragraph);
		return paragraph;
	}

	function CreateParagraphWithText(text)
	{
		let paragraph = AscTest.CreateParagraph();

		if (text)
		{
			let run = AscTest.CreateRun();
			run.AddText(text);
			paragraph.AddToContentToEnd(run);
		}

		return paragraph;
	}

	logicDocument.Start_SilentMode();

	function TurnOnRecalculate()
	{
		logicDocument.TurnOn_Recalculate();
	}

	function TurnOffRecalculate()
	{
		logicDocument.TurnOff_Recalculate();
	}

	function TurnOnRecalculateCurPos()
	{
		logicDocument.TurnOn_RecalculateCurPos();
	}

	function TurnOffRecalculateCurPos()
	{
		logicDocument.TurnOff_RecalculateCurPos();
	}

	function ApplyTextPrToDocument(textPr)
	{
		logicDocument.AddToParagraph(new AscCommonWord.ParaTextPr(textPr));
	}

	function GetDirectTextPr()
	{
		return logicDocument.GetDirectTextPr();
	}

	function GetDirectParaPr()
	{
		return logicDocument.GetDirectParaPr();
	}

	function AddShape(x, y, h, w)
	{
		const drawing = new ParaDrawing(w, h, null, logicDocument.GetDrawingDocument(), logicDocument, null);
		const shapeTrack = new AscFormat.NewShapeTrack('rect', 0, 0, logicDocument.theme, null, null, null, 0);
		shapeTrack.track({}, x, y);
		const shape = shapeTrack.getShape(true, logicDocument.GetDrawingDocument(), null);
		shape.spPr.xfrm.setExtX(w);
		shape.spPr.xfrm.setExtY(h);
		shape.spPr.xfrm.setOffX(0);
		shape.spPr.xfrm.setOffY(0);
		shape.setBDeleted(false);

		shape.setParent(drawing);
		drawing.Set_GraphicObject(shape);
		drawing.Set_DrawingType(drawing_Anchor);
		drawing.Set_WrappingType(WRAPPING_TYPE_NONE);
		drawing.Set_Distance(0, 0, 0, 0);
		const nearestPos = logicDocument.Get_NearestPos(0, x, y, true, drawing);
		drawing.Set_XYForAdd(x, y, nearestPos, 0);
		drawing.AddToDocument(nearestPos);
		AscTest.Recalculate();
		return drawing;
	}

	function SelectDrawings(drawings)
	{
		logicDocument.SelectDrawings(drawings, logicDocument);
	}

	function GetDrawingObjects()
	{
		return logicDocument.DrawingObjects;
	}

	function AddCheckBox()
	{
		const checkBox = logicDocument.AddContentControlCheckBox();
		var specProps = new AscCommon.CSdtCheckBoxPr();
		checkBox.ApplyCheckBoxPr(specProps);
		checkBox.SetFormPr(new AscCommon.CSdtFormPr());
		return checkBox;
	}

	function AddComboBox(items)
	{
		const comboBox = logicDocument.AddContentControlComboBox();
		var specProps = new AscCommon.CSdtComboBoxPr();
		specProps.clear();
		for (let i = 0; i < items.length; i++)
		{
			specProps.add_Item(items[i], items[i]);
		}

		comboBox.ApplyComboBoxPr(specProps);
		comboBox.SetFormPr(new AscCommon.CSdtFormPr());

		return comboBox;
	}

	function AddTable(row, column)
	{
		let table = AscTest.CreateTable(row, column);
		logicDocument.PushToContent(table);
		return table;
	}

	function AddChart()
	{
		const drawing = new ParaDrawing(100, 100, null, drawingDocument, null, null);
		const chartSpace = logicDocument.GetChartObject(Asc.c_oAscChartTypeSettings.lineNormal);
		chartSpace.spPr.setXfrm(new AscFormat.CXfrm());
		chartSpace.spPr.xfrm.setOffX(0);
		chartSpace.spPr.xfrm.setOffY(0);
		chartSpace.spPr.xfrm.setExtX(100);
		chartSpace.spPr.xfrm.setExtY(100);

		chartSpace.setParent(drawing);
		drawing.Set_GraphicObject(chartSpace);
		drawing.setExtent(chartSpace.spPr.xfrm.extX, chartSpace.spPr.xfrm.extY);

		drawing.Set_DrawingType(drawing_Anchor);
		drawing.Set_WrappingType(WRAPPING_TYPE_NONE);
		drawing.Set_Distance(0, 0, 0, 0);
		const nearestPos = logicDocument.Get_NearestPos(0, chartSpace.x, chartSpace.y, true, drawing);
		drawing.Set_XYForAdd(chartSpace.x, chartSpace.y, nearestPos, 0);
		drawing.AddToDocument(nearestPos);
		AscTest.Recalculate();
		return drawing;
	}

	function AddComplexForm()
	{
		let complexForm = logicDocument.AddComplexForm();
		const formPr = new AscWord.CSdtFormPr();
		var formTextPr = new AscCommon.CSdtTextFormPr();
		formTextPr.put_MultiLine(true);
		complexForm.SetFormPr(formPr);
		complexForm.SetTextFormPr(formTextPr);
		return complexForm;
	}

	function round(number, amount)
	{
		const power = Math.pow(10, amount);
		return Math.round(number * power) / power;
	}

	$(function ()
	{
		QUnit.module("Test shortcut actions");
		QUnit.test('Check page break shortcut', (assert) =>
		{
			TurnOnRecalculate();
			ClearDocumentAndAddParagraph();
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertPageBreak);
			assert.strictEqual(logicDocument.GetPagesCount(), 2, 'Check page break shortcut');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertPageBreak);
			assert.strictEqual(logicDocument.GetPagesCount(), 3, 'Check page break shortcut');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertPageBreak);
			assert.strictEqual(logicDocument.GetPagesCount(), 4, 'Check page break shortcut');
			TurnOffRecalculate();
		});

		QUnit.test('Check line break shortcut', (assert) =>
		{
			TurnOnRecalculate();
			let paragraph = ClearDocumentAndAddParagraph();
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertLineBreak);
			assert.strictEqual(paragraph.GetLinesCount(), 2, 'Check line break shortcut');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertLineBreak);
			assert.strictEqual(paragraph.GetLinesCount(), 3, 'Check line break shortcut');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertLineBreak);
			assert.strictEqual(paragraph.GetLinesCount(), 4, 'Check line break shortcut');
			TurnOffRecalculate();
		});

		QUnit.test('Check column break shortcut', (assert) =>
		{
			TurnOnRecalculate();
			let paragraph = ClearDocumentAndAddParagraph();
			let sectionPr = AscTest.GetFinalSection();
			sectionPr.SetColumnsNum(3);
			AscTest.Recalculate();

			function CheckColumns(colCount)
			{
				assert.strictEqual(logicDocument.GetPagesCount(), 1, 'Check logic document page count');
				assert.strictEqual(paragraph.GetPagesCount(), colCount, 'Check paragraph page count');
				for (let i = 0; i < colCount; ++i)
				{
					assert.strictEqual(paragraph.GetAbsoluteColumn(i), i, 'Check paragraph column index');
					assert.strictEqual(paragraph.GetAbsolutePage(i), 0, 'Check paragraph page index');
				}
			}

			CheckColumns(1);
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertColumnBreak);
			CheckColumns(2);
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertColumnBreak);
			CheckColumns(3);

			sectionPr.SetColumnsNum(1);
			TurnOffRecalculate();
		});

		QUnit.test('Check reset char shortcut', (assert) =>
		{
			ClearDocumentAndAddParagraph('Hello world');
			logicDocument.SelectAll();
			ApplyTextPrToDocument({Bold: true, Italic: true, Underline: true});

			let textPr = GetDirectTextPr();
			assert.true(true === textPr.GetBold() && true === textPr.GetItalic() && true === textPr.GetUnderline(), 'Check before reset');
			ExecuteShortcut(c_oAscDocumentShortcutType.ResetChar);
			textPr = GetDirectTextPr();
			assert.true(undefined === textPr.GetBold() && undefined === textPr.GetItalic() && undefined === textPr.GetUnderline(), 'Check after reset');
		});

		QUnit.test('Check adding various characters', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph();

			ExecuteShortcut(c_oAscDocumentShortcutType.NonBreakingSpace);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0), 'Check add non breaking space');
			ExecuteShortcut(c_oAscDocumentShortcutType.CopyrightSign);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9), 'Check add CopyrightSign');
			ExecuteShortcut(c_oAscDocumentShortcutType.EuroSign);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC), 'Check add EuroSign');
			ExecuteShortcut(c_oAscDocumentShortcutType.RegisteredSign);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE), 'Check add RegisteredSign');
			ExecuteShortcut(c_oAscDocumentShortcutType.TrademarkSign);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122), 'Check add TrademarkSign');
			ExecuteShortcut(c_oAscDocumentShortcutType.EnDash);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122, 0x2013), 'Check add EnDash');
			ExecuteShortcut(c_oAscDocumentShortcutType.EmDash);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122, 0x2013, 0x2014), 'Check add EmDash');
			ExecuteShortcut(c_oAscDocumentShortcutType.NonBreakingHyphen);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122, 0x2013, 0x2014, 0x002D), 'Check add NonBreakingHyphen');
			ExecuteShortcut(c_oAscDocumentShortcutType.HorizontalEllipsis);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122, 0x2013, 0x2014, 0x002D, 0x2026), 'Check add HorizontalEllipsis');
			ExecuteHotkey(testHotkeyActions.addSJKSpace);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), String.fromCharCode(0x00A0, 0x00A9, 0x20AC, 0x00AE, 0x2122, 0x2013, 0x2014, 0x002D, 0x2026, 0x0020), 'Check add HorizontalEllipsis');
		});

		QUnit.test('Check text property change', (assert) =>
		{
			ClearDocumentAndAddParagraph('Hello world');
			logicDocument.SelectAll();

			ExecuteShortcut(c_oAscDocumentShortcutType.Bold);
			assert.strictEqual(GetDirectTextPr().GetBold(), true, 'Check turn on bold');
			ExecuteShortcut(c_oAscDocumentShortcutType.Bold);
			assert.strictEqual(GetDirectTextPr().GetBold(), false, 'Check turn off bold');

			ExecuteShortcut(c_oAscDocumentShortcutType.Italic);
			assert.strictEqual(GetDirectTextPr().GetItalic(), true, 'Check turn on italic');
			ExecuteShortcut(c_oAscDocumentShortcutType.Italic);
			assert.strictEqual(GetDirectTextPr().GetItalic(), false, 'Check turn off italic');

			ExecuteShortcut(c_oAscDocumentShortcutType.Strikeout);
			assert.strictEqual(GetDirectTextPr().GetStrikeout(), true, 'Check turn on strikeout');
			ExecuteShortcut(c_oAscDocumentShortcutType.Strikeout);
			assert.strictEqual(GetDirectTextPr().GetStrikeout(), false, 'Check turn off strikeout');

			ExecuteShortcut(c_oAscDocumentShortcutType.Underline);
			assert.strictEqual(GetDirectTextPr().GetUnderline(), true, 'Check turn on underline');
			ExecuteShortcut(c_oAscDocumentShortcutType.Underline);
			assert.strictEqual(GetDirectTextPr().GetUnderline(), false, 'Check turn off underline');

			ExecuteShortcut(c_oAscDocumentShortcutType.Superscript);
			assert.strictEqual(GetDirectTextPr().GetVertAlign(), AscCommon.vertalign_SuperScript, 'Check turn on superscript');
			ExecuteShortcut(c_oAscDocumentShortcutType.Superscript);
			assert.strictEqual(GetDirectTextPr().GetVertAlign(), AscCommon.vertalign_Baseline, 'Check turn off superscript');

			ExecuteShortcut(c_oAscDocumentShortcutType.Subscript);
			assert.strictEqual(GetDirectTextPr().GetVertAlign(), AscCommon.vertalign_SubScript, 'Check turn on subscript');
			ExecuteShortcut(c_oAscDocumentShortcutType.Subscript);
			assert.strictEqual(GetDirectTextPr().GetVertAlign(), AscCommon.vertalign_Baseline, 'Check turn off subscript');

			// defaultSize = 10
			// 10 -> 11 -> 12 -> 14 -> 16 -> 14 -> 12 -> 11 -> 10
			ExecuteShortcut(c_oAscDocumentShortcutType.IncreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 11, 'Check increase font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.IncreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 12, 'Check increase font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.IncreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 14, 'Check increase font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.IncreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 16, 'Check increase font size');

			ExecuteShortcut(c_oAscDocumentShortcutType.DecreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 14, 'Check decrease font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.DecreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 12, 'Check decrease font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.DecreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 11, 'Check decrease font size');
			ExecuteShortcut(c_oAscDocumentShortcutType.DecreaseFontSize);
			assert.strictEqual(GetDirectTextPr().GetFontSize(), 10, 'Check decrease font size');
		});

		QUnit.test('Check select all shortcut', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('Hello world');
			const table = AscTest.CreateTable(2, 2);
			logicDocument.AddToContent(1, table);
			assert.strictEqual(logicDocument.IsSelectionUse(), false, 'Check document selection');
			ExecuteShortcut(c_oAscDocumentShortcutType.EditSelectAll);
			assert.strictEqual(logicDocument.IsSelectionUse(), true, 'Check document selection');
			assert.strictEqual(paragraph.IsSelectedAll(), true, 'Check paragraph selection');
			assert.strictEqual(table.IsSelectedAll(), true, 'Check table selection');
		});

		QUnit.test('Check paragraph property change', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph('Hello world');

			function GetStyleName()
			{
				return logicDocument.GetStyleManager().GetName(paragraph.GetParagraphStyle());
			}

			assert.strictEqual(GetStyleName(), "", "Check style");
			ExecuteShortcut(c_oAscDocumentShortcutType.ApplyHeading1);
			assert.strictEqual(GetStyleName(), "Heading 1", "Check apply heading 1");
			ExecuteShortcut(c_oAscDocumentShortcutType.ApplyHeading2);
			assert.strictEqual(GetStyleName(), "Heading 2", "Check apply heading 2");
			ExecuteShortcut(c_oAscDocumentShortcutType.ApplyHeading3);
			assert.strictEqual(GetStyleName(), "Heading 3", "Check apply heading 3");

			assert.strictEqual(GetDirectParaPr().GetJc(), undefined, "Check justification");
			ExecuteShortcut(c_oAscDocumentShortcutType.CenterPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Center, "Check turn on center para");
			ExecuteShortcut(c_oAscDocumentShortcutType.CenterPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Left, "Check turn off center para");

			ExecuteShortcut(c_oAscDocumentShortcutType.JustifyPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Justify, "Check turn on justify para");
			ExecuteShortcut(c_oAscDocumentShortcutType.JustifyPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Left, "Check turn off justify para");

			ExecuteShortcut(c_oAscDocumentShortcutType.JustifyPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Justify, "Check turn on justify para");
			ExecuteShortcut(c_oAscDocumentShortcutType.LeftPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Left, "Check turn on left para");
			ExecuteShortcut(c_oAscDocumentShortcutType.LeftPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Justify, "Check turn off left para");

			ExecuteShortcut(c_oAscDocumentShortcutType.RightPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Right, "Check turn on right para");
			ExecuteShortcut(c_oAscDocumentShortcutType.RightPara);
			assert.strictEqual(GetDirectParaPr().GetJc(), AscCommon.align_Left, "Check turn off right para");

			ExecuteShortcut(c_oAscDocumentShortcutType.Indent);
			assert.strictEqual(GetDirectParaPr().GetIndLeft(), 12.5);

			ExecuteShortcut(c_oAscDocumentShortcutType.UnIndent);
			assert.strictEqual(GetDirectParaPr().GetIndLeft(), 0);

			const paragraph2 = CreateParagraphWithText('Hello');

			logicDocument.SelectAll();

			ExecuteHotkey(testHotkeyActions.testIndent);
			assert.strictEqual(GetDirectParaPr().GetIndLeft(), 12.5);

			ExecuteHotkey(testHotkeyActions.testUnIndent);
			assert.strictEqual(GetDirectParaPr().GetIndLeft(), 0);
		});

		QUnit.test('Check insert document elements', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph('');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertFootnoteNow);
			const footnotes = logicDocument.GetFootnotesList();
			assert.equal(footnotes.length, 1, 'Check insert footnote shortcut');

			paragraph.SetThisElementCurrent();
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertEndnoteNow);
			const endNotes = logicDocument.GetEndnotesList();
			assert.equal(endNotes.length, 1, 'Check insert endnote shortcut');
			logicDocument.MoveCursorToStartPos();
		});


		QUnit.test('Check shortcuts with sending event to interface', (assert) =>
		{
			function checkSendingEvent(sSendEvent, oEvent, fCustomCheck, customExpectedValue)
			{
				let isCheck = false;
				const fCheck = function (...args)
				{
					if (fCustomCheck)
					{
						isCheck = fCustomCheck(...args);
					}
					else
					{
						isCheck = true;
					}
				}
				editor.asc_registerCallback(sSendEvent, fCheck);

				ExecuteShortcut(oEvent);
				assert.strictEqual(isCheck, customExpectedValue === undefined ? true : customExpectedValue, 'Check catch ' + sSendEvent + ' event');
				editor.asc_unregisterCallback(sSendEvent, fCheck);
			}

			checkSendingEvent("asc_onDialogAddHyperlink", c_oAscDocumentShortcutType.InsertHyperlink);
			checkSendingEvent("asc_onPrint", c_oAscDocumentShortcutType.PrintPreviewAndPrint);

			checkSendingEvent('asc_onMouseMoveStart', testHotkeyEvents[testHotkeyActions.closeAllWindowsPopups][0]);
			checkSendingEvent('asc_onMouseMove', testHotkeyEvents[testHotkeyActions.closeAllWindowsPopups][0]);
			checkSendingEvent('asc_onMouseMoveEnd', testHotkeyEvents[testHotkeyActions.closeAllWindowsPopups][0]);

			checkSendingEvent('asc_onContextMenu', testHotkeyEvents[testHotkeyActions.showContextMenu][0]);
			AscCommon.AscBrowser.isOpera = true;
			checkSendingEvent('asc_onContextMenu', testHotkeyEvents[testHotkeyActions.showContextMenu][1]);
			AscCommon.AscBrowser.isOpera = false;
			checkSendingEvent('asc_onContextMenu', testHotkeyEvents[testHotkeyActions.showContextMenu][2]);
		});

		QUnit.test('Check insert equation shortcut', (assert) =>
		{
			ClearDocumentAndAddParagraph('');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertEquation);
			const math = logicDocument.GetCurrentMath();
			assert.true(!!math, 'Check insert equation shortcut');
		});

		QUnit.test('Check insert elements shortcut', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			ExecuteShortcut(c_oAscDocumentShortcutType.InsertPageNumber);

			const firstRun = paragraph.Content[0];
			assert.strictEqual(firstRun.Content[0].Type, para_PageNum);
		});

		QUnit.test('Check bullet list shortcut', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			assert.false(paragraph.IsBulletedNumbering(), 'check apply bullet list');
			ExecuteShortcut(c_oAscDocumentShortcutType.ApplyListBullet);
			assert.true(paragraph.IsBulletedNumbering(), 'check apply bullet list');
		});

		QUnit.test('Check copy/paste format shortcuts', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph('Hello');
			ApplyTextPrToDocument({Bold: true, Italic: true, Underline: true});
			GetDirectTextPr();
			ExecuteShortcut(c_oAscDocumentShortcutType.CopyFormat);
			let textPr = editor.getFormatPainterData().TextPr;
			assert.true(textPr.Get_Bold());
			assert.true(textPr.Get_Italic());
			assert.true(textPr.Get_Underline());

			paragraph = ClearDocumentAndAddParagraph('');
			ExecuteShortcut(c_oAscDocumentShortcutType.PasteFormat);
			textPr = GetDirectTextPr();
			assert.true(textPr.Get_Bold());
			assert.true(textPr.Get_Italic());
			assert.true(textPr.Get_Underline());
		});

		QUnit.test('Check history shortcuts', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph('Hello');
			paragraph.MoveCursorToEndPos();
			logicDocument.AddTextWithPr(' World');
			ExecuteShortcut(c_oAscDocumentShortcutType.EditUndo);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'Hello');

			ExecuteShortcut(c_oAscDocumentShortcutType.EditRedo);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'Hello World');
		});

		QUnit.test('Check show paramarks shortcut', (assert) =>
		{
			ExecuteShortcut(c_oAscDocumentShortcutType.ShowAll);
			assert.true(editor.ShowParaMarks, 'Check show non printing characters shortcut');
		});

		QUnit.test('Check save shortcut', (assert) =>
		{
			assert.timeout(100);
			const done = assert.async();

			const fOldSave = editor._onSaveCallbackInner;
			editor._onSaveCallbackInner = function ()
			{
				assert.true(true, 'Check save shortcut');
				done();
				editor._onSaveCallbackInner = fOldSave;
			};
			editor._saveCheck = () => true;
			editor.asc_isDocumentCanSave = () => true;
			ExecuteShortcut(c_oAscDocumentShortcutType.Save);
		});

		QUnit.test('Check update fields shortcut', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('Hello');
			const paragraph2 = CreateParagraphWithText('Hello');
			const paragraph3 = CreateParagraphWithText('Hello');

			logicDocument.PushToContent(paragraph2);
			logicDocument.PushToContent(paragraph3);
			for (let i = 0; i < logicDocument.Content.length; i += 1)
			{
				logicDocument.Set_CurrentElement(i, true);
				logicDocument.SetParagraphStyle("Heading 1");
			}

			logicDocument.MoveCursorToStartPos();
			logicDocument.AddTableOfContents(null, new Asc.CTableOfContentsPr());

			logicDocument.MoveCursorToEndPos();
			const paragraph4 = CreateParagraphWithText('Hello');
			logicDocument.PushToContent(paragraph4);
			paragraph4.SetThisElementCurrent(true);
			logicDocument.SetParagraphStyle("Heading 1");

			logicDocument.MoveCursorToStartPos();
			AscTest.MoveCursorRight()

			ExecuteShortcut(c_oAscDocumentShortcutType.UpdateFields);
			assert.strictEqual(logicDocument.Content[0].Content.Content.length, 5, 'Check update fields shortcut');
		});

		QUnit.test('Check remove hotkeys', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('Hello Hello Hello Hello');

			ExecuteHotkey(testHotkeyActions.removeBackSymbol);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'Hello Hello Hello Hell');

			ExecuteHotkey(testHotkeyActions.removeBackWord);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'Hello Hello Hello ');

			logicDocument.MoveCursorToStartPos();
			ExecuteHotkey(testHotkeyActions.removeFrontSymbol);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'ello Hello Hello ');
			ExecuteHotkey(testHotkeyActions.removeFrontWord);
			assert.strictEqual(AscTest.GetParagraphText(paragraph), 'Hello Hello ');
		});
		QUnit.test('Check move/select in text hotkeys', (assert) =>
		{
			function CheckCursorPosition(nExpected)
			{
				const position = logicDocument.GetContentPosition();
				assert.strictEqual(position[position.length - 1].Position, nExpected);
			}

			const paragraph = ClearDocumentAndAddParagraph(
				'Hello World Hello ' +
				'World Hello World ' +
				'Hello World Hello ' +
				'World Hello World ' +
				'Hello World Hello ' +
				'Hello World Hello ' +
				'Hello World Hello ' +
				'Hello World Hello ' +
				'World Hello World');

			logicDocument.MoveCursorToStartPos();
			TurnOnRecalculate();
			TurnOnRecalculateCurPos();
			AscTest.Recalculate();
			TurnOffRecalculate();
			TurnOffRecalculateCurPos();

			ExecuteHotkey(testHotkeyActions.moveToEndLine);
			CheckCursorPosition(18);

			ExecuteHotkey(testHotkeyActions.moveToRightChar);
			CheckCursorPosition(19);

			ExecuteHotkey(testHotkeyActions.moveToLeftChar);
			CheckCursorPosition(18);

			ExecuteHotkey(testHotkeyActions.moveToLeftWord);
			CheckCursorPosition(12);

			ExecuteHotkey(testHotkeyActions.moveToRightWord);
			CheckCursorPosition(18);

			ExecuteHotkey(testHotkeyActions.moveToRightWord);
			CheckCursorPosition(24);


			ExecuteHotkey(testHotkeyActions.moveToStartLine);
			CheckCursorPosition(18);

			ExecuteHotkey(testHotkeyActions.moveDown);
			CheckCursorPosition(36);

			ExecuteHotkey(testHotkeyActions.moveUp);
			CheckCursorPosition(18);

			ExecuteHotkey(testHotkeyActions.moveToEndDocument);
			CheckCursorPosition(161);

			ExecuteHotkey(testHotkeyActions.moveToStartDocument);
			CheckCursorPosition(0);

			AscTest.MoveCursorRight();

			ExecuteHotkey(testHotkeyActions.moveToNextPage);
			CheckCursorPosition(91);

			ExecuteHotkey(testHotkeyActions.moveToPreviousPage);
			CheckCursorPosition(1);

			ExecuteHotkey(testHotkeyActions.moveToStartNextPage);
			CheckCursorPosition(90);

			ExecuteHotkey(testHotkeyActions.moveToStartPreviousPage);
			CheckCursorPosition(0);

			function CheckSelectedText(sExpectedText)
			{
				const selectedText = logicDocument.GetSelectedText();
				assert.strictEqual(selectedText, sExpectedText);
			}

			ExecuteHotkey(testHotkeyActions.selectToEndLine);
			CheckSelectedText('Hello World Hello ');


			ExecuteHotkey(testHotkeyActions.selectRightChar);
			CheckSelectedText('Hello World Hello W');

			ExecuteHotkey(testHotkeyActions.selectLeftChar);
			CheckSelectedText('Hello World Hello ');

			ExecuteHotkey(testHotkeyActions.selectLeftWord);
			CheckSelectedText('Hello World ');

			ExecuteHotkey(testHotkeyActions.selectRightWord);
			CheckSelectedText('Hello World Hello ');

			ExecuteHotkey(testHotkeyActions.selectRightWord);
			CheckSelectedText('Hello World Hello World ');

			ExecuteHotkey(testHotkeyActions.selectRightWord);
			CheckSelectedText('Hello World Hello World Hello ');

			ExecuteHotkey(testHotkeyActions.selectToStartLine);
			CheckSelectedText('Hello World Hello ');

			ExecuteHotkey(testHotkeyActions.selectDown);
			CheckSelectedText('Hello World Hello World Hello World ');

			ExecuteHotkey(testHotkeyActions.selectUp);
			CheckSelectedText('Hello World Hello ');

			ExecuteHotkey(testHotkeyActions.selectToEndDocument);
			CheckSelectedText('Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello Hello World Hello Hello World Hello Hello World Hello World Hello World');

			ExecuteHotkey(testHotkeyActions.selectToStartDocument);
			CheckSelectedText('');

			logicDocument.MoveCursorToEndPos();
			ExecuteHotkey(testHotkeyActions.selectLeftChar);
			CheckSelectedText('d');

			ExecuteHotkey(testHotkeyActions.selectLeftWord);
			CheckSelectedText('World');

			logicDocument.MoveCursorToStartPos();
			AscTest.MoveCursorRight();
			ExecuteHotkey(testHotkeyActions.selectToNextPage);
			CheckSelectedText('ello World Hello World Hello World Hello World Hello World Hello World Hello World Hello H');
			AscTest.MoveCursorRight();

			ExecuteHotkey(testHotkeyActions.selectToPreviousPage);
			CheckSelectedText('ello World Hello World Hello World Hello World Hello World Hello World Hello World Hello H');
			AscTest.MoveCursorLeft();
			ExecuteHotkey(testHotkeyActions.selectToStartNextPage);
			CheckSelectedText('ello World Hello World Hello World Hello World Hello World Hello World Hello World Hello ');
			AscTest.MoveCursorRight();
			ExecuteHotkey(testHotkeyActions.selectToStartPreviousPage);
			CheckSelectedText('Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello ');
		});

		QUnit.test('Check move/select drawings', (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('');
			paragraph.SetThisElementCurrent();
			AscTest.Recalculate();
			const drawing1 = AddShape(0, 0, 100, 200);

			const dotsPerMM = logicDocument.DrawingDocument.GetDotsPerMM();

			function CheckShapePosition(X, Y)
			{
				assert.deepEqual([round(drawing1.X * dotsPerMM, 10), round(drawing1.Y * dotsPerMM, 10), drawing1.Extent.W, drawing1.Extent.H], [X, Y, 200, 100]);
			}

			SelectDrawings([drawing1]);

			ExecuteHotkey(testHotkeyActions.bigMoveGraphicObjectLeft);
			CheckShapePosition(-5, 0);

			ExecuteHotkey(testHotkeyActions.littleMoveGraphicObjectLeft);
			CheckShapePosition(-6, 0);

			ExecuteHotkey(testHotkeyActions.bigMoveGraphicObjectRight);
			CheckShapePosition(-1, 0);

			ExecuteHotkey(testHotkeyActions.littleMoveGraphicObjectRight);
			CheckShapePosition(0, 0);

			ExecuteHotkey(testHotkeyActions.bigMoveGraphicObjectDown);
			CheckShapePosition(0, 5);

			ExecuteHotkey(testHotkeyActions.littleMoveGraphicObjectDown);
			CheckShapePosition(0, 6);

			ExecuteHotkey(testHotkeyActions.bigMoveGraphicObjectUp);
			CheckShapePosition(0, 1);

			ExecuteHotkey(testHotkeyActions.littleMoveGraphicObjectUp);
			CheckShapePosition(0, 0);


			function CheckSelectedObjects(arrOfDrawings)
			{
				const length = Math.max(arrOfDrawings.length, GetDrawingObjects().selectedObjects.length);
				for (let i = 0; i < length; i++)
				{
					assert.true(GetDrawingObjects().selectedObjects[i] === arrOfDrawings[i].GraphicObj);
				}
			}

			const drawing2 = AddShape(0, 0, 10, 10);
			const drawing3 = AddShape(0, 0, 10, 10);
			SelectDrawings([drawing3]);

			ExecuteHotkey(testHotkeyActions.selectNextObject);
			CheckSelectedObjects([drawing1]);

			ExecuteHotkey(testHotkeyActions.selectNextObject);
			CheckSelectedObjects([drawing2]);

			ExecuteHotkey(testHotkeyActions.selectNextObject);
			CheckSelectedObjects([drawing3]);

			ExecuteHotkey(testHotkeyActions.selectPreviousObject);
			CheckSelectedObjects([drawing2]);

			ExecuteHotkey(testHotkeyActions.selectPreviousObject);
			CheckSelectedObjects([drawing1]);

			ExecuteHotkey(testHotkeyActions.selectPreviousObject);
			CheckSelectedObjects([drawing3]);
			TurnOffRecalculate();
		});

		QUnit.test('Check actions with selected shape', (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = CreateParagraphWithText('');
			AscTest.Recalculate();
			let paraDrawing = AddShape(0, 0, 10, 10);
			SelectDrawings([paraDrawing]);

			ExecuteHotkey(testHotkeyActions.createTextBoxContent);
			assert.true(!!paraDrawing.GraphicObj.textBoxContent);

			paraDrawing = AddShape(0, 0, 10, 10);
			paraDrawing.GraphicObj.setWordShape(false);
			SelectDrawings([paraDrawing]);

			ExecuteHotkey(testHotkeyActions.createTextBody);
			assert.true(!!paraDrawing.GraphicObj.txBody);

			SelectDrawings([paraDrawing]);
			ExecuteHotkey(testHotkeyActions.moveCursorToStartPositionShapeEnter);
			assert.true(paraDrawing.GraphicObj.getDocContent().IsCursorAtBegin());

			AscTest.EnterText('Hello');
			SelectDrawings([paraDrawing]);

			ExecuteHotkey(testHotkeyActions.selectAllShapeEnter);
			assert.strictEqual(logicDocument.GetSelectedText(), 'Hello');
			TurnOffRecalculate();
		});


		QUnit.test('Check move in headers/footers', (assert) =>
		{
			TurnOnRecalculate();
			TurnOnRecalculateCurPos();
			const paragraph = ClearDocumentAndAddParagraph("Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World");
			AscTest.Recalculate();


			logicDocument.GoToPage(2);
			GoToFooter(2);
			GoToHeader(2);
			TurnOffRecalculateCurPos();
			TurnOffRecalculate();

			ExecuteHotkey(testHotkeyActions.moveToPreviousHeaderFooter);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[1].Footer);
			ExecuteHotkey(testHotkeyActions.moveToPreviousHeaderFooter);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[1].Header);

			ExecuteHotkey(testHotkeyActions.moveToNextHeaderFooter);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[1].Footer);
			ExecuteHotkey(testHotkeyActions.moveToNextHeaderFooter);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[2].Header);

			ExecuteHotkey(testHotkeyActions.moveToPreviousHeader);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[1].Header);
			ExecuteHotkey(testHotkeyActions.moveToPreviousHeader);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[0].Header);

			ExecuteHotkey(testHotkeyActions.moveToNextHeader);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[1].Header);
			ExecuteHotkey(testHotkeyActions.moveToNextHeader);
			assert.true(logicDocument.Controller.HdrFtr.CurHdrFtr === logicDocument.Controller.HdrFtr.Pages[2].Header);

			RemoveHeader(2);
			RemoveFooter(2);
		});

		QUnit.test('Check reset selection shortcut', (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph("");
			AscTest.Recalculate();

			const drawing1 = AddShape(0, 0, 10, 10);
			const drawing2 = AddShape(0, 0, 10, 10);

			SelectDrawings([drawing1, drawing2]);

			const group = GetDrawingObjects().groupSelectedObjects();
			group.GraphicObj.selectObject(drawing1.GraphicObj, 0);
			GetDrawingObjects().selection.groupSelection = group.GraphicObj;

			ExecuteHotkey(testHotkeyActions.resetShapeSelection);
			assert.strictEqual(GetDrawingObjects().selectedObjects.length, 0);
			TurnOffRecalculate();
		});

		QUnit.test('Check reset actions shortcut', (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph("");
			AscTest.Recalculate()
			editor.StartAddShape('rect');
			ExecuteHotkey(testHotkeyActions.resetStartAddShape);
			assert.strictEqual(editor.isStartAddShape, false, "Test reset add shape");
			TurnOffRecalculate();
			editor.SetPaintFormat(AscCommon.c_oAscFormatPainterState.kOn);
			ExecuteHotkey(testHotkeyActions.resetFormattingByExample);
			assert.strictEqual(editor.isFormatPainterOn(), false, "Test reset formatting by example");

			editor.SetMarkerFormat(true, true, 0, 0, 0);
			ExecuteHotkey(testHotkeyActions.resetMarkerFormat);
			assert.strictEqual(editor.isMarkerFormat, false, "Test reset marker");
		});

		QUnit.test('Check disable shortcuts', (assert) =>
		{
			assert.strictEqual(ExecuteHotkey(testHotkeyActions.disableNumLock) & keydownresult_PreventAll, keydownresult_PreventAll);
			assert.strictEqual(ExecuteHotkey(testHotkeyActions.disableScrollLock) & keydownresult_PreventAll, keydownresult_PreventAll);
		});

		QUnit.test('Check boxes shortcuts', (assert) =>
		{
			let paragraph = ClearDocumentAndAddParagraph('');

			const checkBox = AddCheckBox();
			AscTest.SetFillingFormMode(true);
			ExecuteHotkey(testHotkeyActions.toggleCheckBox);
			assert.true(checkBox.IsCheckBoxChecked());

			ExecuteHotkey(testHotkeyActions.toggleCheckBox);
			assert.false(checkBox.IsCheckBoxChecked());
			AscTest.SetEditingMode();

			ClearDocumentAndAddParagraph('');
			const comboBox = AddComboBox(['Hello', 'World', 'yo']);
			AscTest.SetFillingFormMode(true);
			ExecuteHotkey(testHotkeyActions.nextOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'Hello');

			ExecuteHotkey(testHotkeyActions.nextOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'World');

			ExecuteHotkey(testHotkeyActions.nextOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'yo');

			ExecuteHotkey(testHotkeyActions.previousOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'World');

			ExecuteHotkey(testHotkeyActions.previousOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'Hello');

			ExecuteHotkey(testHotkeyActions.previousOptionComboBox);
			assert.strictEqual(logicDocument.GetSelectedText(), 'yo');
			AscTest.SetEditingMode();
		});

		QUnit.test('Check remove objects shortcut', (assert) =>
		{
			console.log(!!(editor.restrictions & Asc.c_oAscRestrictionType.OnlyForms))
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('');
			AscTest.Recalculate();
			let paraDrawing = AddShape(0, 0, 10, 10);
			SelectDrawings([paraDrawing]);

			ExecuteHotkey(testHotkeyActions.removeShape, 0);
			assert.strictEqual(paragraph.GetRunByElement(paraDrawing), null, 'Test remove shape');

			paraDrawing = AddShape(0, 0, 10, 10);
			SelectDrawings([paraDrawing]);

			ExecuteHotkey(testHotkeyActions.removeShape, 1);
			assert.strictEqual(paragraph.GetRunByElement(paraDrawing), null, 'Test remove shape');
			TurnOffRecalculate();
		});

		QUnit.test('Check move on forms', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			let checkBox1 = AddCheckBox();
			AscTest.MoveCursorRight();
			let checkBox2 = AddCheckBox();
			AscTest.MoveCursorRight();
			let checkBox3 = AddCheckBox();
			AscTest.SetFillingFormMode(true);


			ExecuteHotkey(testHotkeyActions.moveToNextForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox1, 'Test move to next form');

			ExecuteHotkey(testHotkeyActions.moveToNextForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox2, 'Test move to next form');

			ExecuteHotkey(testHotkeyActions.moveToNextForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox3, 'Test move to next form');

			ExecuteHotkey(testHotkeyActions.moveToPreviousForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox2, 'Test move to previous form');
			ExecuteHotkey(testHotkeyActions.moveToPreviousForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox1, 'Test move to previous form');
			ExecuteHotkey(testHotkeyActions.moveToPreviousForm);
			assert.true(logicDocument.GetSelectedElementsInfo().GetInlineLevelSdt() === checkBox3, 'Test move to previous form');

			AscTest.SetEditingMode();
		});

		QUnit.test('Check move in table shortcuts', (assert) =>
		{
			ClearDocumentAndAddParagraph();
			const table = AddTable(3, 4);
			table.Document_SetThisElementCurrent();
			table.MoveCursorToStartPos();
			ExecuteHotkey(testHotkeyActions.moveToNextCell);
			assert.strictEqual(table.CurCell.Index, 1);
			ExecuteHotkey(testHotkeyActions.moveToNextCell);
			assert.strictEqual(table.CurCell.Index, 2);
			ExecuteHotkey(testHotkeyActions.moveToNextCell);
			assert.strictEqual(table.CurCell.Index, 3);

			ExecuteHotkey(testHotkeyActions.moveToPreviousCell);
			assert.strictEqual(table.CurCell.Index, 2);
			ExecuteHotkey(testHotkeyActions.moveToPreviousCell);
			assert.strictEqual(table.CurCell.Index, 1);
			ExecuteHotkey(testHotkeyActions.moveToPreviousCell);
			assert.strictEqual(table.CurCell.Index, 0);
		});

		QUnit.test('Check Select all in chart title', (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('');
			AscTest.Recalculate();
			const paraDrawing = AddChart();

			const chart = paraDrawing.GraphicObj;
			SelectDrawings([paraDrawing]);
			const titles = chart.getAllTitles();
			const controller = GetDrawingObjects();
			controller.selection.chartSelection = chart;
			chart.selectTitle(titles[0], 0);

			ExecuteHotkey(testHotkeyActions.selectAllInChartTitle);
			assert.strictEqual(logicDocument.GetSelectedText(), 'Diagram Title', 'Check select all title');
			TurnOffRecalculate();
		});

		QUnit.test('add new paragraph content', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('Hello text');
			ExecuteHotkey(testHotkeyActions.addNewParagraphContent);
			assert.strictEqual(logicDocument.Content.length, 2);
		});

		QUnit.test('Check add new paragraph math', (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('Hello text');
			logicDocument.AddParaMath();
			AscTest.EnterText('abcd');
			AscTest.MoveCursorLeft();
			ExecuteHotkey(testHotkeyActions.addNewParagraphMath)
			assert.strictEqual(logicDocument.Content.length, 2, 'Test add new paragraph with math');
		});

		QUnit.test("Test add new line to math", (oAssert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			logicDocument.AddParaMath(c_oAscMathType.FractionVertical);
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			AscTest.EnterText('Hello');
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			ExecuteHotkey(testHotkeyActions.addNewLineToMath);
			const paraMath = paragraph.GetAllParaMaths()[0];
			const fraction = paraMath.Root.GetFirstElement();
			const numerator = fraction.getNumerator();
			const eqArray = numerator.GetFirstElement();
			oAssert.strictEqual(eqArray.getRowsCount(), 2, 'Check add new line math');
		});

		QUnit.test("Test remove form", (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			const form = AddComboBox(['hdfh']);
			ExecuteHotkey(testHotkeyActions.removeForm);
			assert.strictEqual(paragraph.GetPosByElement(form), null, 'Check add new line math');
			AscTest.SetEditingMode();
		});

		QUnit.test("Add tab to paragraph", (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('');
			ExecuteHotkey(testHotkeyActions.addTabToParagraph);
			assert.true(paragraph.GetPrevRunElement().IsTab());
		});


		QUnit.test("Test add break line to inlinelvlsdt", (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('');
			const complexForm = AddComplexForm();
			ExecuteHotkey(testHotkeyActions.addBreakLineInlineLvlSdt);
			assert.strictEqual(complexForm.Lines[0], 2);
			TurnOffRecalculate();
		});

		QUnit.test("Test visit hyperlink", (assert) =>
		{
			TurnOnRecalculate()
			const paragraph = ClearDocumentAndAddParagraph('');

			logicDocument.AddToParagraph(new AscWord.CRunBreak(AscWord.break_Page))
			logicDocument.AddHyperlink(new Asc.CHyperlinkProperty({Anchor: '_top', Text: "Beginning of document"}));
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			ExecuteHotkey(testHotkeyActions.visitHyperlink);
			AscTest.Recalculate()
			assert.strictEqual(logicDocument.GetCurrentParagraph(), logicDocument.Content[0]);
			assert.strictEqual(logicDocument.Get_CurPage(), 0);
			TurnOffRecalculate();
		});

		QUnit.test("Test handle tab in math", (oAssert) =>
		{

			const paragraph = ClearDocumentAndAddParagraph('');
			logicDocument.AddParaMath();
			AscTest.EnterText('abcd+abcd+abcd');
			logicDocument.MoveCursorToEndPos();
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();
			AscTest.MoveCursorLeft();

			const props = new CMathMenuBase();
			props.insert_ManualBreak();
			logicDocument.Set_MathProps(props);
			ExecuteHotkey(testHotkeyActions.handleTab);
			AscTest.MoveCursorRight();
			const contentPosition = logicDocument.GetContentPosition();
			const currentRun = contentPosition[contentPosition.length - 1].Class;
			oAssert.strictEqual(currentRun.MathPrp.Get_AlnAt(), 1, 'Test move to next form');
		});


		QUnit.test("Test end editing", (assert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('');
			const checkBox = AddCheckBox();
			AscTest.SetFillingFormMode(true);
			checkBox.MoveCursorToContentControl(true);
			ExecuteHotkey(testHotkeyActions.endEditing);
			const selectedInfo = logicDocument.GetSelectedElementsInfo();
			assert.strictEqual(!!selectedInfo.GetInlineLevelSdt(), false, "Test end editing form");
			AscTest.SetEditingMode();

			GoToHeader(0);
			ExecuteHotkey(testHotkeyActions.endEditing);
			assert.strictEqual(logicDocument.GetDocPosType(), AscCommonWord.docpostype_Content, "Test end editing footer");
			RemoveHeader(0);

			GoToFooter(0);
			ExecuteHotkey(testHotkeyActions.endEditing);
			assert.strictEqual(logicDocument.GetDocPosType(), AscCommonWord.docpostype_Content, "Test end editing footer");
			RemoveFooter(0);
			TurnOffRecalculate();
		});

		QUnit.test("Test unicode to char hotkeys", (assert) =>
		{
			const paragraph = ClearDocumentAndAddParagraph('2601');
			AscTest.MoveCursorLeft(true, true);
			ExecuteHotkey(testHotkeyActions.unicodeToChar);
			assert.strictEqual(logicDocument.GetSelectedText(), '☁', 'Test replace unicode code to symbol');
		});

		QUnit.test("Test reset drag'n'drop", (oAssert) =>
		{
			TurnOnRecalculate();
			const paragraph = ClearDocumentAndAddParagraph('Hello Hello');
			AscTest.Recalculate();
			logicDocument.MoveCursorToStartPos();
			AscTest.MoveCursorRight(true, true);

			let e = new AscCommon.CMouseEventHandler();
			e.Button = AscCommon.g_mouse_button_left;
			e.ClickCount = 1;

			e.Type = AscCommon.g_mouse_event_type_down;
			logicDocument.OnMouseDown(e, 5, 10, 0);

			e.Type = AscCommon.g_mouse_event_type_move;
			logicDocument.OnMouseMove(e, 45, 10, 0);

			ExecuteHotkey(testHotkeyActions.resetDragNDrop);
			oAssert.true(!drawingDocument.IsTrackText(), "Test reset drag'n'drop");

			e.Type = AscCommon.g_mouse_event_type_up;
			logicDocument.OnMouseUp(e, 45, 10, 0);

			TurnOffRecalculate();
		});
	});
})(window);

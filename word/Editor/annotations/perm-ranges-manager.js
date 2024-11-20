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

(function()
{
	let marksToCheck = [];
	
	/**
	 * @param logicDocument {AscWord.Document}
	 * @constructor
	 */
	function PermRangesManager(logicDocument)
	{
		this.logicDocument = logicDocument
		
		this.ranges = {};
	}
	
	PermRangesManager.prototype.addMark = function(mark)
	{
		let rangeId = mark.getRangeId();
		if (!this.ranges[rangeId])
			this.ranges[rangeId] = {};
		
		if (mark.isStart())
			this.ranges[rangeId].start = mark;
		else
			this.ranges[rangeId].end = mark;
	};
	PermRangesManager.prototype.getStartMark = function(rangeId)
	{
		this.updateMarks();
		
		if (!this.ranges[rangeId] || !this.ranges[rangeId].start)
			return null
		
		return this.ranges[rangeId].start;
	};
	PermRangesManager.prototype.getEndMark = function(rangeId)
	{
		this.updateMarks();
		
		if (!this.ranges[rangeId] || !this.ranges[rangeId].end)
			return null;
		
		return this.ranges[rangeId].end;
	};
	PermRangesManager.prototype.updateMarks = function()
	{
		for (let i = 0, count = marksToCheck.length; i < count; ++i)
		{
			let mark = marksToCheck[i];
			if (!mark.isUseInDocument())
				continue;
			
			this.addMark(mark);
		}
		
		marksToCheck.length = 0;
	};
	/**
	 * Проверяем заданный отрезок, если он невалидный или пустой, тогда удаляем его из документа
	 * @param {number} rangeId
	 */
	PermRangesManager.prototype.checkRange = function(rangeId)
	{
		// TODO: implement
	};
	
	function registerPermRangeMark(mark)
	{
		marksToCheck.push(mark);
	}
	//--------------------------------------------------------export----------------------------------------------------
	AscWord.PermRangesManager = PermRangesManager;
	AscWord.registerPermRangeMark = registerPermRangeMark;
	
})();


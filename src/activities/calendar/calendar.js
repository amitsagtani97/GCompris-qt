/* GCompris - calendar.js
 *
 * Copyright (C) 2017 Amit Sagtani <asagtani06@gmail.com>
 *
 * Authors:
 *   "Amit Sagtani" <asagtani06@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

.pragma library
.import QtQuick 2.6 as Quick
.import GCompris 1.0 as GCompris //for ApplicationInfo
.import "qrc:/gcompris/src/core/core.js" as Core

var currentLevel = 0
var numberOfLevel
var currentSubLevel = 1
var currentDataSet
var currentLevelConfig
var dataset
var items
var daySelected = 1
var monthSelected = 2
var yearSelected = 2018
var dayOfWeekSelected
var correctAnswer

function start(items_, dataset_) {
    items = items_
    dataset = dataset_.get()
    numberOfLevel = dataset.length
    currentLevel = 0
    initLevel();
}

function stop() {
}

function initLevel() {
    currentSubLevel = 1;
    items.bar.level = currentLevel + 1
    currentLevelConfig = dataset[currentLevel][0][0]
    setCalendarConfigurations()
    initQuestion();
}

function nextLevel() {
    if(numberOfLevel <= ++currentLevel ) {
        currentLevel = 0
    }
    initLevel();
}

function previousLevel() {
    if(--currentLevel < 0) {
        currentLevel = numberOfLevel - 1
    }
    initLevel();
}

// Configure calendar properties for every level.
function setCalendarConfigurations() {
    items.calendar.navigationBarVisible = currentLevelConfig["navigationBarVisible"]
    items.calendar.minimumDate = currentLevelConfig["minimumDate"]
    items.calendar.maximumDate = currentLevelConfig["maximumDate"]
    items.calendar.visibleYear = currentLevelConfig["visibleYear"]
    yearSelected = currentLevelConfig["visibleYear"]
    items.calendar.visibleMonth = currentLevelConfig["visibleMonth"]
    monthSelected = currentLevelConfig["visibleMonth"]
    items.answerChoices.visible = currentLevelConfig["answerChoiceVisible"]
    items.okButton.visible = currentLevelConfig["okButtonVisible"]
    currentDataSet = dataset[currentLevel][1]
    currentDataSet = Core.shuffle(currentDataSet)
    items.score.numberOfSubLevels = currentDataSet.length
    items.score.currentSubLevel = currentSubLevel
}

function initQuestion() {
    if(currentDataSet.length < currentSubLevel) {
        items.bonus.good("lion")
    }
    else {
        items.score.currentSubLevel = currentSubLevel
        items.questionItem.text = currentDataSet[currentSubLevel-1]["question"]
        correctAnswer = currentDataSet[currentSubLevel-1]["answer"]
    }
}

function checkAnswer() {
    // For levels having days of week table visible.
    if(items.answerChoices.visible) {
        if(dayOfWeekSelected===correctAnswer["dayOfWeek"]) {
            items.questionDelay.start()
            items.okButtonParticles.burst(20)
        }
    }
    // For levels having days of week table not visible.
    else if(!items.answerChoices.visible) {
        if(monthSelected===correctAnswer["month"] && daySelected===correctAnswer["day"] && yearSelected===correctAnswer["year"]) {
            items.questionDelay.start()
            items.okButtonParticles.burst(20)
        }
        else {
            items.bonus.bad("lion")
        }
    }
}

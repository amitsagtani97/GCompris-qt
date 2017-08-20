/* GCompris - Calendar.js
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
var numbersOfSublevel
var currentSubLevel = 1
var currentDataSet
var itemsconnect
var dataset
var items
var dateSelected
var correctAnswer


function start(items_, dataset_) {
    items = items_
    dataset = dataset_.get()
    numberOfLevel = dataset.length
    currentLevel = 0
    initLevel()
}

function stop() {
}

function initLevel() {
    currentSubLevel = 1;
    items.bar.level = currentLevel + 1
    levelConfigurations()
    initQuestion()

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

function levelConfigurations() {
    switch(items.bar.level) {
    case 1:
        items.calendar.navigationBarVisible = false
        items.calendar.visibleMonth = 2
        items.calendar.visibleYear = 2018
        items.calendar.minimumDate = "2018-03-01"
        items.calendar.maximumDate = "2018-03-31"
        currentDataSet = dataset[0]
        currentDataSet = Core.shuffle(currentDataSet)
        break;
    case 2:
        items.calendar.navigationBarVisible = false
        items.calendar.visibleMonth = 2
        items.calendar.visibleYear = 2018
        items.calendar.minimumDate = "2018-03-01"
        items.calendar.maximumDate = "2018-03-31"
        currentDataSet = dataset[1]
        currentDataSet = Core.shuffle(currentDataSet)
        break;
    case 3:
        items.calendar.navigationBarVisible = false
        items.calendar.visibleMonth = 2
        items.calendar.visibleYear = 2018
        items.calendar.minimumDate = "2018-03-01"
        items.calendar.maximumDate = "2018-03-31"
        currentDataSet = dataset[2]
        currentDataSet = Core.shuffle(currentDataSet)
        break;
    case 4:
        items.calendar.navigationBarVisible = true
        items.calendar.visibleMonth = new Date().getMonth()
        items.calendar.visibleYear = new Date().getFullYear()
        currentDataSet = dataset[3]
        currentDataSet = Core.shuffle(currentDataSet)
        break;


    }
    items.score.numberOfSubLevels = dataset[currentLevel].length
    items.score.currentSubLevel = currentSubLevel

}

function initQuestion() {
    if(currentDataSet.length < currentSubLevel) {
        items.bonus.good("flower")
    }
    else {
        items.score.currentSubLevel = currentSubLevel
        items.questionItem.text = currentDataSet[currentSubLevel-1]["question"]
        correctAnswer = currentDataSet[currentSubLevel-1]["answer"]
    }


}

function checkAnswer() {
    switch(items.bar.level) {
    case 1:
        if(dateSelected.getDay() === correctAnswer) {
            currentSubLevel ++
            initQuestion()
        }
        break;
    case 2:
        if(dateSelected.getDate() === correctAnswer) {
            currentSubLevel ++
            initQuestion()
        }
        break;
    case 3:
        if(dateSelected.getDate() === correctAnswer) {
            console.log("Right Answer")
            currentSubLevel ++
            initQuestion()
        }
        break;


    }
}

import * as technologyMatrixData from './technology-matrix.json';
import './main.scss';

const technologyMatrix = technologyMatrixData['default']

document.addEventListener('DOMContentLoaded', function () {
    let textControl = document
        .querySelector('#textMatch');
    textControl.addEventListener('change', hideTable);
    textControl.addEventListener('keyup', hideTable);
    textControl.addEventListener('paste', hideTable);

    document
        .querySelector('#findMatchesButton')
        .addEventListener('click', function () {
            showTable();
            clearTable();
            findMatches();
        })
}, false);

function clearTable() {
    document.querySelector('#matchesTable tbody').innerHTML = '';
}

function showTable() {
    document.querySelector('.matches-container').classList.remove('hidden');
}

function hideTable() {
    document.querySelector('.matches-container').classList.add('hidden');
}

function findMatches() {
    let text = document.querySelector('#textMatch').value.toLowerCase();
    let matches = [];
    for (let technologyStack of technologyMatrix) {
        let technologiesFound = 0;
        for (let technology of technologyStack.technologies) {
            technologiesFound += new RegExp(technology.toLowerCase()).test(text) ? 1 : 0;
        }
        if (technologiesFound > 0) {
            addTableRow(technologyStack.technologyStack, technologyStack.technologies.length, technologiesFound)
        }
    }
    if (document.querySelector('#matchesTable tbody').innerHTML === '') {
        addTableRow('No matches found', null, null)
    }
}

function addTableRow(technologyStack, technologyCount, matchesFound) {
    let row = document
        .createElement('tr');
    row.innerHTML = `<td>${technologyStack}</td>`;

    if (technologyCount !== null && matchesFound !== null) {
        row.innerHTML += `<td>${Number(matchesFound/technologyCount * 100).toFixed(2)}% (${matchesFound}/${technologyCount})</td>`
    }

    document.querySelector('#matchesTable tbody').appendChild(row);
}
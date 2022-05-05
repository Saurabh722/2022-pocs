import { util } from './util';
import { rowTemplate } from './template';

var BPS = {
    heads: {},
    activeRow: null,
    updateEl: function() {
        var $table = $("#bootstrap-data-table");
        BPS.thead = $table.find("thead");
        BPS.tbody = $table.find("tbody");
        BPS.fetchData();
    },
    fetchData: function() {
        $.ajax({
            url: "bps.json",
            type: "Get",
            success: function(data) {
                BPS.loadTemplate(data);
            },
            error: function (){
                console.log("Error");
            }
        });
    },
    bindEvent: function() {
        var $modal = $("#largeModal");
        var $updateField = $modal.find("#updateValue");

        function closeModal() {
            $modal.removeClass("fade show").hide();
            $updateField.val("");
        }

        BPS.tbody.on('click', 'tr:not(.edit)', function(e) {
            e.stopPropagation();
            var $self = $(this);
            if($self.hasClass('selected')) {
                util.hideDetails($self);
            } else {
                util.hideDetails($('tr'));
                util.showDetails($self);
            }
        });
        
        
        $('.menu-item-has-children.dropdown').click(function(){
            $(this).toggleClass('show');
        });

        BPS.tbody.find('tr').on('click', '.edit-icon', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var $self = $(this);
            $self.closest('tr').addClass('edit');
        });

        BPS.tbody.find('tr').on('click', '.save-icon', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var $self = $(this);
            var $selectedRow = $self.closest('tr')
            BPS.updateRowData($selectedRow);
            $selectedRow.removeClass('edit');
            $selectedRow.find('.title-view').hide();
            $selectedRow.find('.detail-view').show();
        });

        BPS.tbody.find('tr').on('click', '.cancel-icon', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var $self = $(this);
            $self.closest('tr').removeClass('edit');
        });

        BPS.tbody.find('tr').on('click', '.add-progress-btn', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var $self = $(this);
            BPS.activeRow = $self.closest('tr').attr('id');
            $modal.addClass("fade show").show();
            var row = BPS.getData(BPS.activeRow).updates;
            var key = util.dayId(row);
            if(row && row[key]) {
                $updateField.val(row[key]);
            }
        });

        $modal.find(".close, .btn.btn-secondary").on('click', closeModal);

        $modal.find(".btn.btn-primary").on('click', function() {
            var updateValue = $updateField.val();

            if(updateValue) {
                var row = BPS.getData(BPS.activeRow);

                if(!row.updates) {
                    row.updates = {};
                }

                row.updates[util.dayId(row.updates)] = updateValue;
                BPS.updateRow(BPS.activeRow, row);
            }
            closeModal();
        });
    },
    setStatus: function(status) {
        var klass = "no-action";

        if(status.indexOf("progress") !== -1) {
            klass = "in-progress";
        } else if (status.indexOf("completed") !== -1) {
            klass = "completed";
        } else if (status.indexOf("hold") !== -1) {
            klass = "on-hold";
        }

        return klass;
    },
    getRowTemplate: function(item) {
        return rowTemplate(item, BPS.heads);
    },
    updateRow: function(id, row) {
        var $row = $('#'+id);
        $row.html(BPS.getRowTemplate(row));
        util.showDetails($row);
        BPS.setData(id, row);
    },
    updateRowData: function($selectedRow) {
        var rowId = $selectedRow.attr('id');
        var row = BPS.getData(rowId);

        for(let key in row) {
            var input = $selectedRow.find('.' + key);
            if(input.length) {
                row[key] = input.val();
            }
        }

        $selectedRow.attr('class', BPS.setStatus(row.status) + " selected");
        BPS.updateRow(rowId, row);
    },
    loadRows: function(id, item) {
        var row = BPS.getData(id);
        item.status = item.status ? item.status.toLowerCase() : "no-action";

        if(row) {
            item = row;
        } else {
            BPS.setData(id, item);
        }

        
        BPS.tbody.append(`
            <tr class="${ BPS.setStatus(item.status) }" id="${id}">
                ${ BPS.getRowTemplate(item) }
            </tr>
        `);
    },
    getData: function(id) {
        return JSON.parse(localStorage.getItem(id));
    },
    setData: function(id, data) {
        localStorage.setItem(id, JSON.stringify(data));
    },
    loadTemplate: function(data) {
        BPS.heads = data.heads;
        var rows = data.rows;
        var count = 1;

        rows.forEach(item => {
            var id = 'row_'+ count;
            BPS.loadRows(id, item);
            count++;
        });

        BPS.bindEvent();
    }
}

export { BPS };
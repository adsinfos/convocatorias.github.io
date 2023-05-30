"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstadisgestionComponent = void 0;
var core_1 = require("@angular/core");
var ng2_charts_1 = require("ng2-charts");
var EstadisgestionComponent = /** @class */ (function () {
    function EstadisgestionComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.title = 'Estadisticas';
        this.doughnutChartType = 'doughnut';
        this.barChartLegend = true;
        this.barChartPlugins = [];
        this.estadisticas = [];
        this.doughnutChartLabels = [];
        this.doughnutChartOptions = {
            responsive: true
        };
        this.doughnutChartDatasets = [];
        this.dataService.getJson('assets/gestiones.json').subscribe(function (data) {
            var _a;
            _this.estadisticas = data;
            var grupos = new Set(_this.estadisticas.map(function (d) { return d.grupo; }));
            var fechas = new Set(_this.estadisticas.map(function (d) { return d.fecha; }));
            var datosPorGrupoYFecha = {};
            var total = {};
            for (var _i = 0, fechas_1 = fechas; _i < fechas_1.length; _i++) {
                var fecha = fechas_1[_i];
                datosPorGrupoYFecha[fecha] = {};
            }
            for (var _b = 0, _c = _this.estadisticas; _b < _c.length; _b++) {
                var dato = _c[_b];
                datosPorGrupoYFecha[dato.fecha][dato.grupo] = Number(dato.cantidad);
            }
            for (var _d = 0, fechas_2 = fechas; _d < fechas_2.length; _d++) {
                var fecha = fechas_2[_d];
                var data_1 = [];
                for (var _e = 0, grupos_1 = grupos; _e < grupos_1.length; _e++) {
                    var grupo = grupos_1[_e];
                    if (datosPorGrupoYFecha[fecha][grupo]) {
                        data_1.push(datosPorGrupoYFecha[fecha][grupo]);
                    }
                    else {
                        data_1.push(0);
                    }
                }
                total[fecha] = data_1;
            }
            console.log(total);
            for (var clave in total) {
                _this.doughnutChartDatasets.push({ data: total[clave], label: clave });
            }
            _this.doughnutChartLabels = Array.from(grupos);
            (_a = _this.chart) === null || _a === void 0 ? void 0 : _a.update();
        });
    }
    EstadisgestionComponent.prototype.regresar = function () {
        window.location.href = "https://adsinfo.me";
    };
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective)
    ], EstadisgestionComponent.prototype, "chart");
    EstadisgestionComponent = __decorate([
        core_1.Component({
            selector: 'app-estadisgestion',
            templateUrl: './estadisgestion.component.html',
            styleUrls: ['./estadisgestion.component.sass']
        })
    ], EstadisgestionComponent);
    return EstadisgestionComponent;
}());
exports.EstadisgestionComponent = EstadisgestionComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstadisticaComponent = void 0;
var core_1 = require("@angular/core");
var ng2_charts_1 = require("ng2-charts");
var EstadisticaComponent = /** @class */ (function () {
    function EstadisticaComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.title = 'Estadisticas';
        this.barChartLegend = true;
        this.barChartPlugins = [];
        this.estadisticas = [];
        this.barChartData = {
            labels: [],
            datasets: [
                { data: [], label: 'Convocatorias leidas', backgroundColor: '#426eff' }
            ]
        };
        this.barChartOptions = {
            responsive: true
        };
        this.dataService.getJson('assets/estadistica.json').subscribe(function (data) {
            var _a, _b;
            _this.estadisticas = data;
            for (var _i = 0, _c = _this.estadisticas; _i < _c.length; _i++) {
                var fila = _c[_i];
                (_a = _this.barChartData.labels) === null || _a === void 0 ? void 0 : _a.push(fila.fecha);
                _this.barChartData.datasets[0].data.push(Number(fila.cantidad));
                (_b = _this.chart) === null || _b === void 0 ? void 0 : _b.update();
            }
        });
    }
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective)
    ], EstadisticaComponent.prototype, "chart");
    EstadisticaComponent = __decorate([
        core_1.Component({
            selector: 'app-estadistica',
            templateUrl: './estadistica.component.html',
            styleUrls: ['./estadistica.component.sass']
        })
    ], EstadisticaComponent);
    return EstadisticaComponent;
}());
exports.EstadisticaComponent = EstadisticaComponent;

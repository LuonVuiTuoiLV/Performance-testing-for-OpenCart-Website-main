/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 15.0, "series": [{"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[600.0, 2.0], [300.0, 5.0], [700.0, 1.0], [400.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[600.0, 1.0], [300.0, 6.0], [400.0, 3.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[600.0, 4.0], [300.0, 5.0], [400.0, 3.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[600.0, 2.0], [300.0, 4.0], [700.0, 2.0], [800.0, 2.0], [400.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[2300.0, 2.0], [2600.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [1500.0, 2.0], [3100.0, 1.0], [3200.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[600.0, 2.0], [300.0, 4.0], [700.0, 2.0], [800.0, 1.0], [400.0, 3.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[600.0, 3.0], [300.0, 3.0], [700.0, 1.0], [400.0, 3.0], [500.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[600.0, 1.0], [300.0, 7.0], [400.0, 2.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 5.0], [700.0, 1.0], [400.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[600.0, 4.0], [300.0, 5.0], [400.0, 4.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [400.0, 4.0], [500.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 55.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1310.0, "series": [{"data": [[0.0, 1310.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 55.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 3.822463768115946, "minX": 1.73346492E12, "maxY": 3.822463768115946, "series": [{"data": [[1.73346492E12, 3.822463768115946]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346492E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.0, "maxY": 3299.0, "series": [{"data": [[4.0, 2.5], [2.0, 1.0], [3.0, 3.7142857142857144], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[3.5999999999999996, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26-Aggregated", "isController": false}, {"data": [[4.0, 7.5], [2.0, 2.0], [3.0, 3.142857142857143], [6.0, 2.0], [7.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[3.5999999999999996, 3.9333333333333322]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27-Aggregated", "isController": false}, {"data": [[4.0, 5.75], [2.0, 1.0], [3.0, 2.142857142857143], [6.0, 15.0], [7.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[3.5999999999999996, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28-Aggregated", "isController": false}, {"data": [[4.0, 410.5], [2.0, 261.5], [1.0, 211.0], [5.0, 433.0], [6.0, 697.0], [3.0, 329.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[3.866666666666667, 417.4666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-Aggregated", "isController": false}, {"data": [[4.0, 5.5], [2.0, 1.5], [3.0, 4.142857142857143], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[3.5999999999999996, 3.866666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22-Aggregated", "isController": false}, {"data": [[4.0, 365.3333333333333], [2.0, 249.0], [1.0, 247.0], [5.0, 494.5], [6.0, 570.0], [3.0, 371.25], [7.0, 625.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[3.999999999999999, 416.6666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 3.5], [3.0, 4.142857142857142], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[3.5999999999999996, 3.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23-Aggregated", "isController": false}, {"data": [[4.0, 3.75], [2.0, 2.5], [3.0, 2.4285714285714284], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[3.5999999999999996, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24-Aggregated", "isController": false}, {"data": [[4.0, 462.2], [2.0, 330.0], [1.0, 217.0], [5.0, 680.3333333333334], [3.0, 365.75], [7.0, 653.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[3.7999999999999994, 467.66666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [3.0, 2.7142857142857144], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[3.5999999999999996, 2.333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25-Aggregated", "isController": false}, {"data": [[4.0, 613.0], [2.0, 296.0], [5.0, 585.0], [6.0, 871.0], [3.0, 342.0], [7.0, 704.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[4.0, 536.0666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [2.0, 3.0], [1.0, 1.0], [5.0, 4.333333333333333], [6.0, 2.0], [3.0, 2.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[3.866666666666667, 2.4666666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11-Aggregated", "isController": false}, {"data": [[4.0, 1.5], [2.0, 3.0], [1.0, 1.0], [5.0, 1.6666666666666667], [6.0, 1.6666666666666667], [3.0, 2.5]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[3.866666666666667, 1.9999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10-Aggregated", "isController": false}, {"data": [[4.0, 2276.3333333333335], [2.0, 1575.0], [1.0, 1515.0], [5.0, 2942.5], [6.0, 3299.0], [3.0, 1791.25], [7.0, 3271.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[3.999999999999999, 2361.600000000001]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[4.0, 578.8333333333333], [2.0, 285.0], [5.0, 557.0], [6.0, 840.0], [3.0, 328.0], [7.0, 662.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[4.0, 509.5333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0-Aggregated", "isController": false}, {"data": [[4.0, 2.6], [2.0, 1.0], [1.0, 1.0], [5.0, 2.0], [3.0, 3.25], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[3.7999999999999994, 2.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 4.5], [2.0, 2.0], [5.0, 2.5], [6.0, 11.0], [3.0, 6.666666666666667], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[4.0, 4.599999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1-Aggregated", "isController": false}, {"data": [[4.0, 3.0], [2.0, 2.0], [1.0, 1.0], [5.0, 8.666666666666666], [3.0, 2.25], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[3.7999999999999994, 3.7999999999999994]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [2.0, 1.5], [3.0, 3.4285714285714284], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[3.5999999999999996, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20-Aggregated", "isController": false}, {"data": [[4.0, 5.833333333333333], [2.0, 2.0], [5.0, 15.5], [6.0, 9.0], [3.0, 1.3333333333333333], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[4.0, 5.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2-Aggregated", "isController": false}, {"data": [[4.0, 2.6], [2.0, 2.0], [1.0, 1.0], [5.0, 7.333333333333334], [3.0, 2.0], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[3.7999999999999994, 3.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [2.0, 4.0], [3.0, 4.142857142857142], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[3.5999999999999996, 3.466666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21-Aggregated", "isController": false}, {"data": [[4.0, 5.166666666666666], [2.0, 2.5], [5.0, 4.0], [6.0, 7.0], [3.0, 4.333333333333334], [7.0, 6.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[4.0, 4.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3-Aggregated", "isController": false}, {"data": [[4.0, 4.2], [2.0, 2.0], [1.0, 2.0], [5.0, 5.666666666666666], [3.0, 2.25], [7.0, 18.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[3.7999999999999994, 4.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 2.25], [2.0, 2.0], [3.0, 2.4285714285714284], [6.0, 3.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[3.5999999999999996, 2.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 2.5], [3.0, 2.5714285714285716], [6.0, 3.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[3.5999999999999996, 3.733333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16-Aggregated", "isController": false}, {"data": [[4.0, 3.75], [2.0, 2.0], [3.0, 4.428571428571429], [6.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[3.5999999999999996, 3.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 1.5], [3.0, 2.5714285714285716], [6.0, 4.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[3.5999999999999996, 2.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18-Aggregated", "isController": false}, {"data": [[4.0, 7.75], [2.0, 3.0], [3.0, 2.857142857142857], [6.0, 3.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[3.5999999999999996, 4.200000000000001]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 6.75], [2.0, 2.0], [3.0, 3.5714285714285716], [6.0, 57.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[3.5999999999999996, 7.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12-Aggregated", "isController": false}, {"data": [[4.0, 3.75], [2.0, 3.0], [3.0, 5.142857142857143], [6.0, 69.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[3.5999999999999996, 8.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 3.0], [3.0, 2.5714285714285716], [6.0, 6.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[3.5999999999999996, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 2.0], [5.0, 2.0], [6.0, 2.0], [3.0, 4.25], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[3.999999999999999, 2.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 1.75], [2.0, 2.5], [3.0, 5.0], [6.0, 10.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[3.5999999999999996, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19-Aggregated", "isController": false}, {"data": [[4.0, 1.0], [2.0, 1.0], [1.0, 1.0], [5.0, 2.0], [6.0, 2.0], [3.0, 1.25], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[3.999999999999999, 1.5333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 3.6666666666666665], [2.0, 2.0], [1.0, 1.0], [5.0, 3.0], [6.0, 2.0], [3.0, 2.5], [7.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[3.999999999999999, 2.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 1.0], [5.0, 4.5], [6.0, 2.0], [3.0, 2.75], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[3.999999999999999, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 600.5], [2.0, 431.0], [3.0, 458.2857142857143], [6.0, 677.0], [7.0, 707.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[3.5999999999999996, 523.7333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 3.0], [1.0, 2.0], [5.0, 3.75], [6.0, 3.0], [3.0, 3.5], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[3.999999999999999, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 1.0], [1.0, 2.0], [5.0, 3.25], [6.0, 3.0], [3.0, 3.5], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[3.999999999999999, 2.733333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 1.0], [5.0, 5.25], [6.0, 2.0], [3.0, 1.25], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[3.999999999999999, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 2.3333333333333335], [2.0, 2.0], [1.0, 2.0], [5.0, 3.5], [6.0, 20.0], [3.0, 3.5], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[3.999999999999999, 4.199999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 3.5], [2.0, 3.0], [3.0, 2.4285714285714284], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[3.5999999999999996, 2.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 3.0], [1.0, 2.0], [5.0, 5.0], [6.0, 6.0], [3.0, 3.9999999999999996], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[3.999999999999999, 4.133333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 355.3333333333333], [2.0, 241.0], [1.0, 240.0], [5.0, 478.75], [6.0, 547.0], [3.0, 359.5], [7.0, 604.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[3.999999999999999, 403.3999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 2.3333333333333335], [2.0, 3.0], [1.0, 2.0], [5.0, 6.75], [6.0, 3.0], [3.0, 3.5], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[3.999999999999999, 3.933333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 3.0], [1.0, 2.0], [5.0, 4.25], [6.0, 4.0], [3.0, 3.0], [7.0, 8.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[3.999999999999999, 3.4666666666666672]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 2.0], [1.0, 2.0], [5.0, 2.0], [6.0, 2.6666666666666665], [3.0, 2.75]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[3.866666666666667, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3-Aggregated", "isController": false}, {"data": [[4.0, 8.5], [2.0, 3.5], [1.0, 4.0], [5.0, 3.3333333333333335], [6.0, 3.0], [3.0, 2.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[3.866666666666667, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.0], [1.0, 2.0], [5.0, 2.3333333333333335], [6.0, 5.333333333333333], [3.0, 3.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[3.866666666666667, 3.066666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1-Aggregated", "isController": false}, {"data": [[4.0, 398.0], [2.0, 254.0], [1.0, 201.0], [5.0, 414.0], [6.0, 670.3333333333334], [3.0, 318.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[3.866666666666667, 402.0666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0-Aggregated", "isController": false}, {"data": [[4.0, 1.6666666666666667], [2.0, 1.0], [5.0, 1.0], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[4.0, 1.5333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20-Aggregated", "isController": false}, {"data": [[4.0, 1.6], [2.0, 2.0], [1.0, 1.0], [5.0, 2.0], [3.0, 3.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[3.7999999999999994, 2.0666666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11-Aggregated", "isController": false}, {"data": [[4.0, 1.8], [2.0, 1.0], [1.0, 1.0], [5.0, 2.6666666666666665], [3.0, 1.75], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[3.7999999999999994, 1.8666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 4.0], [1.0, 2.0], [5.0, 3.3333333333333335], [6.0, 3.0], [3.0, 1.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[3.866666666666667, 2.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 3.5], [1.0, 4.0], [5.0, 4.333333333333333], [6.0, 2.3333333333333335], [3.0, 1.75]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[3.866666666666667, 2.8000000000000003]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8-Aggregated", "isController": false}, {"data": [[4.0, 6.0], [2.0, 3.0], [1.0, 1.0], [5.0, 4.0], [6.0, 3.6666666666666665], [3.0, 2.75]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[3.866666666666667, 3.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7-Aggregated", "isController": false}, {"data": [[4.0, 2.5], [2.0, 2.0], [1.0, 1.0], [5.0, 4.666666666666667], [6.0, 3.0], [3.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[3.866666666666667, 3.266666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6-Aggregated", "isController": false}, {"data": [[4.0, 2.0], [2.0, 2.5], [1.0, 4.0], [5.0, 11.0], [6.0, 3.6666666666666665], [3.0, 2.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[3.866666666666667, 4.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5-Aggregated", "isController": false}, {"data": [[4.0, 4.5], [2.0, 2.0], [1.0, 3.0], [5.0, 4.0], [6.0, 2.6666666666666665], [3.0, 2.5]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[3.866666666666667, 3.0666666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4-Aggregated", "isController": false}, {"data": [[4.0, 7.5], [2.0, 1.5], [5.0, 5.0], [6.0, 3.0], [3.0, 2.666666666666667], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[4.0, 4.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8-Aggregated", "isController": false}, {"data": [[4.0, 2.6], [2.0, 2.0], [1.0, 2.0], [5.0, 2.6666666666666665], [3.0, 2.5], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[3.7999999999999994, 2.466666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [2.0, 1.0], [5.0, 11.0], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[4.0, 4.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9-Aggregated", "isController": false}, {"data": [[4.0, 450.6], [2.0, 324.0], [1.0, 213.0], [5.0, 651.0], [3.0, 356.75], [7.0, 627.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[3.7999999999999994, 453.1333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 5.166666666666666], [2.0, 3.5], [5.0, 6.0], [6.0, 7.0], [3.0, 2.0], [7.0, 1.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[4.0, 4.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4-Aggregated", "isController": false}, {"data": [[4.0, 5.6], [2.0, 2.0], [1.0, 2.0], [5.0, 3.6666666666666665], [3.0, 2.5], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[3.7999999999999994, 3.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 4.166666666666667], [2.0, 2.0], [5.0, 7.5], [6.0, 2.0], [3.0, 2.666666666666667], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[4.0, 3.799999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5-Aggregated", "isController": false}, {"data": [[4.0, 2.4], [2.0, 2.0], [1.0, 2.0], [5.0, 2.6666666666666665], [3.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[3.7999999999999994, 2.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 9.0], [2.0, 2.0], [5.0, 10.5], [6.0, 2.0], [3.0, 4.333333333333333], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[4.0, 6.3999999999999995]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6-Aggregated", "isController": false}, {"data": [[4.0, 5.4], [2.0, 2.0], [1.0, 2.0], [5.0, 5.0], [3.0, 2.25], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[3.7999999999999994, 3.8666666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 3.5], [2.0, 1.0], [5.0, 3.0], [6.0, 3.0], [3.0, 3.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[4.0, 2.9333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7-Aggregated", "isController": false}, {"data": [[4.0, 5.2], [2.0, 2.0], [1.0, 2.0], [5.0, 4.333333333333333], [3.0, 2.0], [7.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[3.7999999999999994, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 6.25], [2.0, 4.0], [3.0, 5.857142857142857], [6.0, 3.0], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[3.5999999999999996, 5.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7-Aggregated", "isController": false}, {"data": [[4.0, 2.166666666666667], [2.0, 2.0], [5.0, 2.0], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[4.0, 2.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18-Aggregated", "isController": false}, {"data": [[4.0, 6.75], [2.0, 5.0], [3.0, 8.142857142857142], [6.0, 18.0], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[3.5999999999999996, 7.733333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6-Aggregated", "isController": false}, {"data": [[4.0, 4.333333333333333], [2.0, 1.5], [5.0, 2.5], [6.0, 2.0], [3.0, 2.6666666666666665], [7.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[4.0, 3.266666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17-Aggregated", "isController": false}, {"data": [[4.0, 5.0], [2.0, 3.0], [3.0, 12.0], [6.0, 4.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[3.5999999999999996, 7.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5-Aggregated", "isController": false}, {"data": [[4.0, 5.666666666666666], [2.0, 2.0], [5.0, 2.0], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[4.0, 3.4000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16-Aggregated", "isController": false}, {"data": [[4.0, 31.5], [2.0, 3.0], [3.0, 14.142857142857142], [6.0, 2.0], [7.0, 11.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[3.5999999999999996, 16.266666666666662]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4-Aggregated", "isController": false}, {"data": [[4.0, 4.666666666666667], [2.0, 2.0], [5.0, 2.0], [6.0, 11.0], [3.0, 2.0], [7.0, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[4.0, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15-Aggregated", "isController": false}, {"data": [[4.0, 17.5], [2.0, 3.0], [3.0, 3.4285714285714284], [6.0, 4.0], [7.0, 10.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[3.5999999999999996, 7.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3-Aggregated", "isController": false}, {"data": [[4.0, 7.0], [2.0, 5.5], [3.0, 6.428571428571429], [6.0, 82.0], [7.0, 13.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[3.5999999999999996, 11.933333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2-Aggregated", "isController": false}, {"data": [[4.0, 18.75], [2.0, 3.0], [3.0, 5.571428571428571], [6.0, 85.0], [7.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[3.5999999999999996, 13.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1-Aggregated", "isController": false}, {"data": [[4.0, 546.25], [2.0, 414.0], [3.0, 395.1428571428571], [6.0, 583.0], [7.0, 681.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[3.5999999999999996, 469.53333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0-Aggregated", "isController": false}, {"data": [[4.0, 2.166666666666667], [2.0, 1.5], [5.0, 1.5], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 4.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[4.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19-Aggregated", "isController": false}, {"data": [[4.0, 3.5], [2.0, 2.0], [5.0, 2.0], [6.0, 2.0], [3.0, 1.6666666666666667], [7.0, 26.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[4.0, 4.133333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10-Aggregated", "isController": false}, {"data": [[4.0, 4.0], [2.0, 1.5], [5.0, 2.5], [6.0, 2.0], [3.0, 3.3333333333333335], [7.0, 5.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[4.0, 3.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14-Aggregated", "isController": false}, {"data": [[4.0, 2.6666666666666665], [2.0, 1.5], [5.0, 2.0], [6.0, 3.0], [3.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[4.0, 2.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13-Aggregated", "isController": false}, {"data": [[4.0, 4.25], [2.0, 3.5], [3.0, 4.857142857142858], [6.0, 3.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[3.5999999999999996, 4.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9-Aggregated", "isController": false}, {"data": [[4.0, 3.1666666666666665], [2.0, 1.5], [5.0, 2.5], [6.0, 1.0], [3.0, 1.3333333333333333], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[4.0, 2.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12-Aggregated", "isController": false}, {"data": [[4.0, 3.75], [2.0, 4.0], [3.0, 3.0], [6.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[3.5999999999999996, 3.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8-Aggregated", "isController": false}, {"data": [[4.0, 3.5], [2.0, 4.0], [5.0, 2.5], [6.0, 3.0], [3.0, 1.6666666666666667], [7.0, 29.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}, {"data": [[4.0, 4.7333333333333325]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 7.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 28718.5, "minX": 1.73346492E12, "maxY": 805036.5666666667, "series": [{"data": [[1.73346492E12, 805036.5666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73346492E12, 28718.5]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346492E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 1.5333333333333332, "minX": 1.73346492E12, "maxY": 2361.600000000001, "series": [{"data": [[1.73346492E12, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346492E12, 3.9333333333333322]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346492E12, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346492E12, 417.4666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346492E12, 3.866666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346492E12, 416.6666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 3.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346492E12, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346492E12, 467.66666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 2.333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346492E12, 536.0666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346492E12, 2.4666666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346492E12, 1.9999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346492E12, 2361.600000000001]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346492E12, 509.5333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346492E12, 2.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 4.599999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346492E12, 3.7999999999999994]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346492E12, 5.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346492E12, 3.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 3.466666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346492E12, 4.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346492E12, 4.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 2.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346492E12, 3.733333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346492E12, 3.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346492E12, 2.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346492E12, 4.200000000000001]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 7.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346492E12, 8.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346492E12, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346492E12, 2.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346492E12, 1.5333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 2.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 523.7333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 2.733333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 4.199999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 2.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 4.133333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 403.3999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 3.933333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 3.4666666666666672]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 3.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346492E12, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346492E12, 3.066666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346492E12, 402.0666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346492E12, 1.5333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346492E12, 2.0666666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 1.8666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 2.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346492E12, 2.8000000000000003]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346492E12, 3.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346492E12, 3.266666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346492E12, 4.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346492E12, 3.0666666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346492E12, 4.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346492E12, 2.466666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 4.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346492E12, 453.1333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 4.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346492E12, 3.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 3.799999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346492E12, 2.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 6.3999999999999995]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346492E12, 3.8666666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 2.9333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346492E12, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 5.4]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 2.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346492E12, 7.733333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 3.266666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346492E12, 7.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 3.4000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346492E12, 16.266666666666662]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 3.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346492E12, 7.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 11.933333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 13.999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 469.53333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346492E12, 4.133333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346492E12, 3.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346492E12, 2.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346492E12, 4.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 2.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346492E12, 3.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 4.7333333333333325]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346492E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.73346492E12, "maxY": 2209.8666666666663, "series": [{"data": [[1.73346492E12, 2.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346492E12, 3.8666666666666663]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346492E12, 2.9333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346492E12, 399.6666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346492E12, 3.866666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346492E12, 396.93333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 3.533333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346492E12, 2.666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346492E12, 449.46666666666675]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 2.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346492E12, 502.46666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346492E12, 2209.8666666666663]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346492E12, 502.46666666666664]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 2.7333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 3.4000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 2.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346492E12, 3.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346492E12, 3.5333333333333328]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346492E12, 2.266666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346492E12, 4.066666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 6.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346492E12, 8.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346492E12, 3.933333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 3.9999999999999996]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 461.33333333333337]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 2.6666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 396.93333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346492E12, 399.6666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346492E12, 449.46666666666675]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 5.199999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 2.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346492E12, 6.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 3.266666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346492E12, 7.466666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 3.333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346492E12, 16.266666666666662]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 3.666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346492E12, 7.3999999999999995]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 10.866666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 13.866666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 461.33333333333337]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 1.9333333333333331]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346492E12, 4.133333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346492E12, 3.1999999999999997]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346492E12, 2.2666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346492E12, 4.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346492E12, 3.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 4.7333333333333325]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346492E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.73346492E12, "maxY": 5.133333333333333, "series": [{"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10", "isController": false}, {"data": [[1.73346492E12, 5.133333333333333]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0", "isController": false}, {"data": [[1.73346492E12, 0.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1", "isController": false}, {"data": [[1.73346492E12, 0.7999999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20", "isController": false}, {"data": [[1.73346492E12, 0.39999999999999997]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2", "isController": false}, {"data": [[1.73346492E12, 0.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18", "isController": false}, {"data": [[1.73346492E12, 0.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13", "isController": false}, {"data": [[1.73346492E12, 0.26666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 0.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.39999999999999997]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 5.133333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 0.2666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 0.4666666666666668]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 0.5333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 0.7999999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.26666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 0.26666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666668]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10", "isController": false}, {"data": [[1.73346492E12, 0.26666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9", "isController": false}, {"data": [[1.73346492E12, 0.5333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8", "isController": false}, {"data": [[1.73346492E12, 0.7999999999999999]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7", "isController": false}, {"data": [[1.73346492E12, 0.5333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6", "isController": false}, {"data": [[1.73346492E12, 0.26666666666666666]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5", "isController": false}, {"data": [[1.73346492E12, 0.4666666666666668]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4", "isController": false}, {"data": [[1.73346492E12, 1.1333333333333335]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 0.2666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 0.2]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666668]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 0.4666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6", "isController": false}, {"data": [[1.73346492E12, 0.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 0.6]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 1.2000000000000002]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7", "isController": false}, {"data": [[1.73346492E12, 0.13333333333333336]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18", "isController": false}, {"data": [[1.73346492E12, 0.9333333333333332]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17", "isController": false}, {"data": [[1.73346492E12, 2.8000000000000003]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16", "isController": false}, {"data": [[1.73346492E12, 2.0]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4", "isController": false}, {"data": [[1.73346492E12, 0.19999999999999998]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15", "isController": false}, {"data": [[1.73346492E12, 0.39999999999999997]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3", "isController": false}, {"data": [[1.73346492E12, 0.9333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2", "isController": false}, {"data": [[1.73346492E12, 0.8666666666666665]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1", "isController": false}, {"data": [[1.73346492E12, 5.133333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19", "isController": false}, {"data": [[1.73346492E12, 0.2666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10", "isController": false}, {"data": [[1.73346492E12, 0.5333333333333334]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14", "isController": false}, {"data": [[1.73346492E12, 0.06666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13", "isController": false}, {"data": [[1.73346492E12, 0.8]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9", "isController": false}, {"data": [[1.73346492E12, 0.3333333333333333]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12", "isController": false}, {"data": [[1.73346492E12, 0.8666666666666667]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8", "isController": false}, {"data": [[1.73346492E12, 0.20000000000000004]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346492E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.73346492E12, "maxY": 871.0, "series": [{"data": [[1.73346492E12, 871.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73346492E12, 277.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73346492E12, 680.3399999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73346492E12, 452.8000000000002]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73346492E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73346492E12, 3.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346492E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 52.0, "maxY": 3.0, "series": [{"data": [[147.0, 2.0], [156.0, 3.0], [152.0, 2.0], [178.0, 3.0], [182.0, 3.0], [52.0, 3.0], [113.0, 3.0], [60.0, 3.0], [126.0, 2.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 182.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 52.0, "maxY": 3.0, "series": [{"data": [[147.0, 1.0], [156.0, 2.0], [152.0, 0.0], [178.0, 0.0], [182.0, 1.0], [52.0, 0.0], [113.0, 1.0], [60.0, 3.0], [126.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 182.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 22.75, "minX": 1.73346492E12, "maxY": 22.75, "series": [{"data": [[1.73346492E12, 22.75]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346492E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 11.0, "minX": 1.73346492E12, "maxY": 11.75, "series": [{"data": [[1.73346492E12, 11.75]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.73346492E12, 11.0]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73346492E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.25, "minX": 1.73346492E12, "maxY": 0.25, "series": [{"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-18-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-8-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-4-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-12-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-6-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-8-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-10-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-16-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-0-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-4-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-6-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-11-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-20-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-6-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-8-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-14-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-9-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-4-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-22-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-2-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-25-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-3-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-0-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-10-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-0-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-2-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-23-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "Test-success", "isController": true}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-11-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-7-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-6-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-16-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-2-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-2-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-9-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-15-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-4-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-18-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-27-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-5-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-7-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-13-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-10-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-11-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-9-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-17-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-7-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-9-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-3-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-7-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-0-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-5-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-5-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-3-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-21-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-15-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-10-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-8-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-3-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-5-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-19-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-9-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-13-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-7-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-5-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-2-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-11-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-26-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-20-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-0-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-6-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-10-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-24-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-14-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-1-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-17-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-12-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=checkout/cart&language=en-gb-11-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=common/home&language=en-gb-28-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-3-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=information/information&language=en-gb&information_id=1-4-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=account/login&language=en-gb-8-success", "isController": false}, {"data": [[1.73346492E12, 0.25]], "isOverall": false, "label": "http://localhost/opencart-4.0.2.3/upload/index.php?route=product/product&language=en-gb&product_id=40-19-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346492E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 23.0, "minX": 1.73346492E12, "maxY": 23.0, "series": [{"data": [[1.73346492E12, 23.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73346492E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

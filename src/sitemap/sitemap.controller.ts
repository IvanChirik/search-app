import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TopPageService } from 'src/top-page/top-page.service';
import { addDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {

    domain: string;

    constructor(
        private readonly topPageService: TopPageService,
        private readonly configService: ConfigService
    ) {
        this.domain = this.configService.get('DOMAIN') ?? '';
    }


    @Get('xml')
    @Header('content-type', 'text/xml')
    async sitemap() {
        const formatString = 'yyyy-MM-dd\'T\'HH:mm:00.000xxx';
        const res = [{
            loc: this.domain,
            lastmod: format(addDays(new Date(), -1), formatString),
            changefreq: 'daily',
            priority: '1.0'
        },
        {
            loc: `${this.domain}/courses`,
            lastmod: format(addDays(new Date(), -1), formatString),
            changefreq: 'daily',
            priority: '1.0'
        }];
        const pages = await this.topPageService.findAll();
        pages.forEach(p =>
            res.push({
                loc: `${this.domain}${CATEGORY_URL[p.firstLevelCategory]}/${p.alias}`,
                lastmod: format(addDays(new Date(), -1), formatString),
                changefreq: 'weakly',
                priority: '0.7'
            })
        );
        const builder = new Builder({
            xmldec: {
                version: '1.0',
                encoding: 'UTF-8'
            }
        });
        return builder.buildObject({
            urlset: {
                $: {
                    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
                },
                url: res
            }
        })
    }
}

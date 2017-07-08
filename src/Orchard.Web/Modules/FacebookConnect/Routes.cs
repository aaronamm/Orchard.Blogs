﻿using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;
using Orchard.Mvc.Routes;

namespace FacebookConnect
{
    public class Routes : IRouteProvider
    {

        public void GetRoutes(ICollection<RouteDescriptor> routes)
        {
            foreach (var routeDescriptor in GetRoutes())
            {
                routes.Add(routeDescriptor);
            }
        }

        public IEnumerable<RouteDescriptor> GetRoutes()
        {
            return new[] {
                new RouteDescriptor {

                    Priority = 100,
                    Route = new Route(
                        "Users/Account/LogOn",
                        new RouteValueDictionary {
                            {"area", "FacebookConnect"},
                            {"controller", "Facebook"},
                            {"action", "Connect"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "FacebookConnect"}
                        },
                        new MvcRouteHandler())
                }, new RouteDescriptor {
                    Priority = 9,
                    Route = new Route(
                        "facebook/connect",
                        new RouteValueDictionary {
                            {"area", "FacebookConnect"},
                            {"controller", "Facebook"},
                            {"action", "Connect"}
                        },
                        new RouteValueDictionary(),
                        new RouteValueDictionary {
                            {"area", "FacebookConnect"}
                        },
                        new MvcRouteHandler())
                }
            };
        }
    }
}